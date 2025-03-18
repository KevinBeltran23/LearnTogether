import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { registerAuthRoutes, verifyAuthToken } from "./routes/auth";
import { registerUsersRoutes } from "./routes/users";
import { connectMongo, connectMongoose } from "./config/db";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors()); 

async function setUpServer() {
    try {
        // Connect to MongoDB using Mongoose (for schema-based operations)
        await connectMongoose();
        console.log("Mongoose connected - Schemas initialized");
        const mongoClient = await connectMongo();
        
        app.get("/hello", (req: Request, res: Response) => {
            res.json({ message: "Hello, world!" });
        });

        registerAuthRoutes(app, mongoClient);
        app.use("/api/*", verifyAuthToken);
        registerUsersRoutes(app, mongoClient);
        
        app.get("*", (req: Request, res: Response) => {
            console.log("none of the routes above me were matched");
        });

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error setting up server:", error);
        process.exit(1);
    }
}

setUpServer();
