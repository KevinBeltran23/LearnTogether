import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { ImageProvider } from "./imageProvider";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";

const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;
const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

const app = express();
app.use(express.static(staticDir));

async function setUpServer() {
    try {
        console.log("Attempting Mongo connection at " + connectionStringRedacted);
        const mongoClient = await MongoClient.connect(connectionString);
        console.log("MongoDB connection established.");

        const collectionInfos = await mongoClient.db().listCollections().toArray();
        console.log("Collections in the database:", collectionInfos.map(collectionInfo => collectionInfo.name));

        app.get("/hello", (req: Request, res: Response) => {
            res.send("Hello, World");
        });
        
        // Define /api/images route
        app.get("/api/images", async (req: Request, res: Response) => {
            try {
                const imageProvider = new ImageProvider(mongoClient);
                const images = await imageProvider.getAllImages();
                res.json(images);
            } catch (error) {
                console.error("Error fetching images:", error);
                res.status(500).json({ error: "Failed to fetch images" });
            }
        });
        
        app.get("/images", (req: Request, res: Response) => {
            const options = {
                root: staticDir, 
            };
            res.sendFile("index.html", options, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Sent: index.html");
                }
            });
        });
        
        app.get("/image/:filename", (req: Request, res: Response) => {
            const options = {
                root: staticDir, 
            };
            res.sendFile("index.html", options, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Sent:", "index.html");
                }
            });
        });
        
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
