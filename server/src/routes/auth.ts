import express, { NextFunction, Request, Response } from "express";
import { MongoClient } from "mongodb";
import { CredentialsProvider } from "../services/credentialsProvider";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const signatureKey = process.env.JWT_SECRET;
if (!signatureKey) {
    throw new Error("Missing JWT_SECRET from env file");
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

function generateAuthToken(username: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(
            { username: username },
            signatureKey as string,
            { expiresIn: "1d" },
            (error: any, token: any) => {
                if (error) reject(error);
                else resolve(token as string);
            }
        );
    });
}

export function registerAuthRoutes(app: express.Application, mongoClient: MongoClient) {
    const credentialsProvider = new CredentialsProvider(mongoClient);

    app.post("/auth/register", async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                res.status(400).send({
                    error: "Bad request",
                    message: "Missing username or password"
                });
            }

            const registrationSuccess = await credentialsProvider.registerUser(username, password);
            if (!registrationSuccess) {
                res.status(400).send({
                    error: "Bad request",
                    message: "Username already taken"
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
            const { username, password } = req.body;

            // Check for missing username or password
            if (!username || !password) {
                res.status(400).send({
                    error: "Bad request",
                    message: "Missing username or password"
                });
            }

            // Verify the user's password
            const isPasswordValid = await credentialsProvider.verifyPassword(username, password);
            if (!isPasswordValid) {
                res.status(401).send({
                    error: "Unauthorized",
                    message: "Incorrect username or password"
                });
            }

            // Generate a JWT token
            const token = await generateAuthToken(username);
            res.send({ token: token });
        } catch (error) {
            console.error("Error logging in:", error);
            res.status(500).json({ error: "Failed to login user" });
        }
    });
}