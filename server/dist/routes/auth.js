"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAuthRoutes = void 0;
const authServices_1 = require("../services/authServices");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signatureKey = process.env.JWT_SECRET;
if (!signatureKey) {
    throw new Error("Missing JWT_SECRET from env file");
}
const registerAuthRoutes = (app) => {
    /**
     * Register a new user
     * POST /auth/register
     */
    app.post("/auth/register", async (req, res) => {
        try {
            const { email, password } = req.body;
            // Validate input
            if (!email || !password) {
                res.status(400).json({
                    success: false,
                    message: "Email and password are required"
                });
                return;
            }
            // Try to register user
            try {
                const success = await (0, authServices_1.registerUser)(email, password);
                if (!success) {
                    res.status(409).json({
                        success: false,
                        message: "User with this email already exists"
                    });
                    return;
                }
                // Generate authentication token
                const token = await (0, authServices_1.generateAuthToken)(email);
                res.status(201).json({
                    success: true,
                    message: "User registered successfully",
                    token
                });
            }
            catch (authError) {
                // Handle specific authentication errors
                console.log("Registration service error:", authError);
                res.status(400).json({
                    success: false,
                    message: authError instanceof Error ? authError.message : "Registration failed"
                });
            }
        }
        catch (error) {
            // Handle unexpected errors
            console.error("Unexpected registration error:", error);
            res.status(500).json({
                success: false,
                message: "An error occurred during registration"
            });
        }
    });
    /**
     * Login user
     * POST /auth/login
     */
    app.post("/auth/login", async (req, res) => {
        try {
            const { email, password } = req.body;
            // Validate input
            if (!email || !password) {
                res.status(400).json({
                    success: false,
                    message: "Email and password are required"
                });
                return;
            }
            try {
                // Verify password
                const isValidPassword = await (0, authServices_1.verifyPassword)(email, password);
                if (!isValidPassword) {
                    res.status(401).json({
                        success: false,
                        message: "Invalid email or password"
                    });
                    return;
                }
                // Generate authentication token
                const token = await (0, authServices_1.generateAuthToken)(email);
                res.json({
                    success: true,
                    message: "Login successful",
                    token
                });
            }
            catch (authError) {
                // Don't expose specific error details to the client for security
                console.log("Login service error:", authError);
                res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }
        }
        catch (error) {
            // Handle unexpected errors
            console.error("Unexpected login error:", error);
            res.status(500).json({
                success: false,
                message: "An error occurred during login"
            });
        }
    });
};
exports.registerAuthRoutes = registerAuthRoutes;
