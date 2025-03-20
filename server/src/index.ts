import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { registerAuthRoutes } from "./routes/auth";
import { verifyAuthToken } from "./services/authServices";
import { registerUsersRoutes } from "./routes/users";
import { connectMongo, connectMongoose } from "./config/db";
import path from 'path';
import { registerPostsRoutes } from "./routes/posts";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 9000;

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

        registerAuthRoutes(app);
        app.use("/api/*", verifyAuthToken);
        registerUsersRoutes(app);
        registerPostsRoutes(app);
        
        app.get("*", (req: Request, res: Response) => {
            console.log("none of the routes above me were matched");
        });

        // Serve the Next.js static files
        const clientBuildPath = path.join(__dirname, '../../client/out');
        app.use(express.static(clientBuildPath));

        // This route handles client-side routing in Next.js
        app.get('*', (req, res) => {
            // API routes should be handled by your server routes
            if (req.path.startsWith('/api')) {
                res.status(404).send('API endpoint not found');
            }
            
            // For everything else, serve the index.html
            res.sendFile(path.join(clientBuildPath, 'index.html'));
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
