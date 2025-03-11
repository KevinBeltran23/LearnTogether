"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
const imageProvider_1 = require("./imageProvider");
dotenv_1.default.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";
const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;
const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;
const app = (0, express_1.default)();
app.use(express_1.default.static(staticDir));
async function setUpServer() {
    try {
        console.log("Attempting Mongo connection at " + connectionStringRedacted);
        const mongoClient = await mongodb_1.MongoClient.connect(connectionString);
        console.log("MongoDB connection established.");
        const collectionInfos = await mongoClient.db().listCollections().toArray();
        console.log("Collections in the database:", collectionInfos.map(collectionInfo => collectionInfo.name));
        app.get("/hello", (req, res) => {
            res.send("Hello, World");
        });
        // Define /api/images route
        app.get("/api/images", async (req, res) => {
            try {
                const imageProvider = new imageProvider_1.ImageProvider(mongoClient);
                const images = await imageProvider.getAllImages();
                res.json(images);
            }
            catch (error) {
                console.error("Error fetching images:", error);
                res.status(500).json({ error: "Failed to fetch images" });
            }
        });
        app.get("/images", (req, res) => {
            const options = {
                root: staticDir,
            };
            res.sendFile("index.html", options, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Sent: index.html");
                }
            });
        });
        app.get("/image/:filename", (req, res) => {
            const options = {
                root: staticDir,
            };
            res.sendFile("index.html", options, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Sent:", "index.html");
                }
            });
        });
        app.get("*", (req, res) => {
            console.log("none of the routes above me were matched");
        });
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
setUpServer();
