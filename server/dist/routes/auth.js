"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = verifyAuthToken;
exports.registerAuthRoutes = registerAuthRoutes;
const credentialsProvider_1 = require("../services/credentialsProvider");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signatureKey = process.env.JWT_SECRET;
if (!signatureKey) {
    throw new Error("Missing JWT_SECRET from env file");
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
function registerAuthRoutes(app, mongoClient) {
    const credentialsProvider = new credentialsProvider_1.CredentialsProvider(mongoClient);
    app.post("/auth/register", async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).send({
                    error: "Bad request",
                    message: "Missing email or password"
                });
            }
            const registrationSuccess = await credentialsProvider.registerUser(email, password);
            if (!registrationSuccess) {
                res.status(400).send({
                    error: "Bad request",
                    message: "email already taken"
                });
            }
            res.status(201).send();
        }
        catch (error) {
            console.error("Error signing up:", error);
            res.status(500).json({ error: "Failed to register user" });
        }
    });
    app.post("/auth/login", async (req, res) => {
        try {
            const { email, password } = req.body;
            // Check for missing email or password
            if (!email || !password) {
                res.status(400).send({
                    error: "Bad request",
                    message: "Missing email or password"
                });
            }
            // Verify the user's password
            const isPasswordValid = await credentialsProvider.verifyPassword(email, password);
            if (!isPasswordValid) {
                res.status(401).send({
                    error: "Unauthorized",
                    message: "Incorrect email or password"
                });
            }
            // Generate a JWT token
            const token = await generateAuthToken(email);
            res.send({ token: token });
        }
        catch (error) {
            console.error("Error logging in:", error);
            res.status(500).json({ error: "Failed to login user" });
        }
    });
}
