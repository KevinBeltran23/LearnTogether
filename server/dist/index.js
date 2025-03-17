"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
const posts_1 = require("./routes/posts");
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./routes/auth");
const users_1 = require("./routes/users");
dotenv_1.default.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 8000;
const staticDir = process.env.STATIC_DIR || "public";
const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;
const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.static(staticDir));
async function setUpServer() {
    try {
        const mongoClient = await mongodb_1.MongoClient.connect(connectionString);
        const collectionInfos = await mongoClient.db().listCollections().toArray();
        console.log("Collections in the database:", collectionInfos.map(collectionInfo => collectionInfo.name));
        (0, auth_1.registerAuthRoutes)(app, mongoClient);
        (0, posts_1.registerPostsRoutes)(app, mongoClient);
        (0, users_1.registerUsersRoutes)(app, mongoClient);
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
