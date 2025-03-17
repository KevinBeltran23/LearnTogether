import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";

export function registerUsersRoutes(app: express.Application, mongoClient: MongoClient) {
    app.get("/api/users/:id", async (req: Request, res: Response) => {
        try {
            // get a users public profile
            console.log("not implemented");
        } catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });

    app.put("/api/users/:id", async (req: Request, res: Response) => {
        try {
            // update a users profile
            console.log("not implemented");
        } catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });

    app.delete("/api/users/:id", async (req: Request, res: Response) => {
        try {
            // delete a users profile
            console.log("not implemented");
        } catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });
}