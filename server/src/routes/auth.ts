import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { registerUser, loginUser, authenticateUser, logoutUser } from "middleware/auth";

export function registerAuthRoutes(app: express.Application, mongoClient: MongoClient) {
    app.post("/api/auth/register", registerUser, async (req: Request, res: Response) => {
        try {
            // register a user
            console.log("not implemented");
        } catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });

    app.post("/api/auth/login", loginUser, async (req: Request, res: Response) => {
        try {
            // authenticate a user
            console.log("not implemented");
        } catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });

    app.post("/api/auth/logout", logoutUser, async (req: Request, res: Response) => {
        try {
            // log out a user
            console.log("not implemented");
        } catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });

    app.get("/api/auth/me", authenticateUser, async (req: Request, res: Response) => {
        try {
            // get a users profile (protected)
            console.log("not implemented");
        } catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });
}