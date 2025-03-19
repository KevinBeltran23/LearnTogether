"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.registerUser = void 0;
exports.generateAuthToken = generateAuthToken;
exports.verifyToken = verifyToken;
exports.verifyAuthToken = verifyAuthToken;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userCredsSchema_1 = __importDefault(require("../schemas/userCredsSchema"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signatureKey = process.env.JWT_SECRET;
if (!signatureKey) {
    throw new Error("Missing JWT_SECRET from env file");
}
/**
 * Register a new user
 */
const registerUser = async (email, plaintextPassword) => {
    try {
        const existingUser = await userCredsSchema_1.default.findOne({ email });
        if (existingUser) {
            return false; // User already exists
        }
        // Generate salt and hash the password
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(plaintextPassword, salt);
        // Create new user credentials
        const newUserCreds = new userCredsSchema_1.default({
            email,
            password: hashedPassword
        });
        // Save to database
        await newUserCreds.save();
        return true;
    }
    catch (error) {
        console.error('Error in registerUser:', error);
        throw new Error('Registration failed');
    }
};
exports.registerUser = registerUser;
/**
 * Verify user password
 */
const verifyPassword = async (email, plaintextPassword) => {
    try {
        const userRecord = await userCredsSchema_1.default.findOne({ email });
        if (!userRecord) {
            return false; // User does not exist
        }
        // Compare the provided password with the stored hashed password
        return await bcrypt_1.default.compare(plaintextPassword, userRecord.password);
    }
    catch (error) {
        console.error('Error in verifyPassword:', error);
        // Return false instead of throwing to prevent app crash
        return false;
    }
};
exports.verifyPassword = verifyPassword;
/**
 * Generate authentication token
 */
function generateAuthToken(email) {
    return new Promise((resolve, reject) => {
        const signatureKey = process.env.JWT_SECRET;
        if (!signatureKey) {
            reject(new Error("Missing JWT_SECRET from env file"));
            return;
        }
        jsonwebtoken_1.default.sign({ email: email }, signatureKey, { expiresIn: "1d" }, (error, token) => {
            if (error) {
                console.error('Error generating token:', error);
                reject(new Error('Token generation failed'));
            }
            else {
                resolve(token);
            }
        });
    });
}
/**
 * Verify JWT token
 */
function verifyToken(token, signatureKey) {
    try {
        return jsonwebtoken_1.default.verify(token, signatureKey);
    }
    catch (error) {
        console.error('Token verification error:', error);
        throw new Error('Invalid token');
    }
}
/**
 * Middleware to verify authentication token
 */
function verifyAuthToken(req, res, next) {
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
            const decoded = jsonwebtoken_1.default.verify(token, signatureKey);
            res.locals.token = decoded;
            next();
        }
        catch (tokenError) {
            console.error('Token verification failed:', tokenError);
            res.status(403).json({ error: 'Invalid or expired token' });
        }
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ error: 'Authentication error' });
    }
}
