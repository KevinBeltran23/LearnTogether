import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { registerPostsRoutes } from "./routes/posts";
import cors from 'cors';
import { registerAuthRoutes, verifyAuthToken } from "./routes/auth";
import { registerUsersRoutes } from "./routes/users";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 8000;

const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;
const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

const app = express();
app.use(express.json());
app.use(cors()); 

async function setUpServer() {
    try {
        const mongoClient = await MongoClient.connect(connectionString);
        const collectionInfos = await mongoClient.db().listCollections().toArray();
        console.log("Collections in the database:", collectionInfos.map(collectionInfo => collectionInfo.name));

        app.get("/hello", (req: Request, res: Response) => {
            res.json({ message: "Hello, world!" });
        });

        registerAuthRoutes(app, mongoClient);
        app.use("/api/*", verifyAuthToken);
        registerPostsRoutes(app, mongoClient);
        registerUsersRoutes(app, mongoClient);
        
        app.get("*", (req: Request, res: Response) => {
            console.log("none of the routes above me were matched");
        });

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

setUpServer();
