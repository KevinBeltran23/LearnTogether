import express, { Request, Response } from "express";
import { registerUser, verifyPassword, generateAuthToken } from "../services/authServices";
import dotenv from "dotenv";

dotenv.config();
const signatureKey = process.env.JWT_SECRET;
if (!signatureKey) {
    throw new Error("Missing JWT_SECRET from env file");
}

export function registerAuthRoutes(app: express.Application) {

    app.post("/auth/register", async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).send({
                    error: "Bad request",
                    message: "Missing email or password"
                });
            }

            const registrationSuccess = await registerUser(email, password);
            if (!registrationSuccess) {
                res.status(400).send({
                    error: "Bad request",
                    message: "email already taken"
                });
            }

            res.status(201).send();
        } catch (error) {
            console.error("Error signing up:", error);
            res.status(500).json({ error: "Failed to register user" });
        }
    });

    app.post("/auth/login", async (req: Request, res: Response) => {
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
            const isPasswordValid = await verifyPassword(email, password);
            if (!isPasswordValid) {
                res.status(401).send({
                    error: "Unauthorized",
                    message: "Incorrect email or password"
                });
            }

            // Generate a JWT token
            const token = await generateAuthToken(email);
            res.send({ token: token });
        } catch (error) {
            console.error("Error logging in:", error);
            res.status(500).json({ error: "Failed to login user" });
        }
    });
}