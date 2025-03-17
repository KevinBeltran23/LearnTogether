import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";

export function registerPostsRoutes(app: express.Application, mongoClient: MongoClient) {
    app.get("/api/posts", async (req: Request, res: Response) => {
        try {
            // get all the posts here from mongodb
            console.log("not implemented");
        } catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });

    app.post("/api/posts", async (req: Request, res: Response) => {
        try {
            // create a post
            console.log("not implemented");
        } catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });

    app.put("/api/posts/:id", async (req: Request, res: Response) => {
        try {
            // update a post
            console.log("not implemented");
        } catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });

    app.delete("/api/posts/:id", async (req: Request, res: Response) => {
        try {
            // delete a post
            console.log("not implemented");
        } catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });
}