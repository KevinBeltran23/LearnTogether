"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.registerUser = void 0;
exports.generateAuthToken = generateAuthToken;
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
const registerUser = async (email, plaintextPassword) => {
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
};
exports.registerUser = registerUser;
const verifyPassword = async (email, plaintextPassword) => {
    const userRecord = await userCredsSchema_1.default.findOne({ email });
    if (!userRecord) {
        return false; // User does not exist
    }
    // Compare the provided password with the stored hashed password
    return await bcrypt_1.default.compare(plaintextPassword, userRecord.password);
};
exports.verifyPassword = verifyPassword;
function generateAuthToken(email) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign({ email: email }, signatureKey, { expiresIn: "1d" }, (error, token) => {
            if (error)
                reject(error);
            else
                resolve(token);
        });
    });
}
function verifyAuthToken(req, res, next // Call next() to run the next middleware or request handler
) {
    const authHeader = req.get("Authorization");
    // The header should say "Bearer <token string>".  Discard the Bearer part.
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).end();
    }
    else { // signatureKey already declared as a module-level variable
        jsonwebtoken_1.default.verify(token, signatureKey, (error, decoded) => {
            if (decoded) {
                res.locals.token = decoded;
                next();
            }
            else {
                res.status(403).end();
            }
        });
    }
}
