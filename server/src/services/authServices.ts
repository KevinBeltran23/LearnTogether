import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userCreds from '../schemas/userCredsSchema';
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const signatureKey = process.env.JWT_SECRET;
if (!signatureKey) {
    throw new Error("Missing JWT_SECRET from env file");
}

/**
 * Register a new user
 */
export const registerUser = async (email: string, plaintextPassword: string): Promise<boolean> => {
  try {
    const existingUser = await userCreds.findOne({ email });
    if (existingUser) {
      return false; // User already exists
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

    // Create new user credentials
    const newUserCreds = new userCreds({
      email,
      password: hashedPassword
    });
      
    // Save to database
    await newUserCreds.save();

    return true;
  } catch (error) {
    console.error('Error in registerUser:', error);
    throw new Error('Registration failed');
  }
};

/**
 * Verify user password
 */
export const verifyPassword = async (email: string, plaintextPassword: string): Promise<boolean> => {
  try {
    const userRecord = await userCreds.findOne({ email });
    if (!userRecord) {
      return false; // User does not exist
    }
    
    // Compare the provided password with the stored hashed password
    return await bcrypt.compare(plaintextPassword, userRecord.password);
  } catch (error) {
    console.error('Error in verifyPassword:', error);
    // Return false instead of throwing to prevent app crash
    return false;
  }
};

/**
 * Generate authentication token
 */
export function generateAuthToken(email: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const signatureKey = process.env.JWT_SECRET;
    if (!signatureKey) {
      reject(new Error("Missing JWT_SECRET from env file"));
      return;
    }

    jwt.sign(
      { email: email },
      signatureKey,
      { expiresIn: "1d" },
      (error: any, token: any) => {
        if (error) {
          console.error('Error generating token:', error);
          reject(new Error('Token generation failed'));
        } else {
          resolve(token as string);
        }
      }
    );
  });
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string, signatureKey: string): any {
  try {
    return jwt.verify(token, signatureKey);
  } catch (error) {
    console.error('Token verification error:', error);
    throw new Error('Invalid token');
  }
}

/**
 * Middleware to verify authentication token
 */
export function verifyAuthToken(req: Request, res: Response, next: Function) {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }
    
    const signatureKey = process.env.JWT_SECRET;
    if (!signatureKey) {
      throw new Error("Missing JWT_SECRET from env file");
    }

    try {
      const decoded = jwt.verify(token, signatureKey);
      res.locals.token = decoded;
      next();
    } catch (tokenError) {
      console.error('Token verification failed:', tokenError);
      res.status(403).json({ error: 'Invalid or expired token' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication error' });
  }
}