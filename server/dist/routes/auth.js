"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAuthRoutes = registerAuthRoutes;
const authServices_1 = require("../services/authServices");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signatureKey = process.env.JWT_SECRET;
if (!signatureKey) {
    throw new Error("Missing JWT_SECRET from env file");
}
function registerAuthRoutes(app) {
    app.post("/auth/register", async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).send({
                    error: "Bad request",
                    message: "Missing email or password"
                });
            }
            const registrationSuccess = await (0, authServices_1.registerUser)(email, password);
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
            const isPasswordValid = await (0, authServices_1.verifyPassword)(email, password);
            if (!isPasswordValid) {
                res.status(401).send({
                    error: "Unauthorized",
                    message: "Incorrect email or password"
                });
            }
            // Generate a JWT token
            const token = await (0, authServices_1.generateAuthToken)(email);
            res.send({ token: token });
        }
        catch (error) {
            console.error("Error logging in:", error);
            res.status(500).json({ error: "Failed to login user" });
        }
    });
}
