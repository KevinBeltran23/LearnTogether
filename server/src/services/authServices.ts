import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userCreds from '../schemas/userCredsSchema';
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const signatureKey = process.env.JWT_SECRET;
if (!signatureKey) {
    throw new Error("Missing JWT_SECRET from env file");
}

export const registerUser = async (email: string, plaintextPassword: string) => {
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
}

export const verifyPassword = async (email: string, plaintextPassword: string): Promise<boolean> => {
    const userRecord = await userCreds.findOne({ email });
    if (!userRecord) {
        return false; // User does not exist
    }
    // Compare the provided password with the stored hashed password
    return await bcrypt.compare(plaintextPassword, userRecord.password);
}

export function generateAuthToken(email: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(
            { email: email },
            signatureKey as string,
            { expiresIn: "1d" },
            (error: any, token: any) => {
                if (error) reject(error);
                else resolve(token as string);
            }
        );
    });
}

export function verifyAuthToken(
    req: Request,
    res: Response,
    next: NextFunction // Call next() to run the next middleware or request handler
) {
    const authHeader = req.get("Authorization");
    // The header should say "Bearer <token string>".  Discard the Bearer part.
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).end();
    } else { // signatureKey already declared as a module-level variable
        jwt.verify(token, signatureKey as string, (error: any, decoded: any) => {
            if (decoded) {
                res.locals.token = decoded;
                next();
            } else {
                res.status(403).end();
            }
        });
    }
}