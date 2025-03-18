"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const posts_1 = require("./routes/posts");
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./routes/auth");
const users_1 = require("./routes/users");
const db_1 = require("./config/db");
dotenv_1.default.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
async function setUpServer() {
    try {
        const mongoClient = await (0, db_1.connectMongo)();
        app.get("/hello", (req, res) => {
            res.json({ message: "Hello, world!" });
        });
        (0, auth_1.registerAuthRoutes)(app, mongoClient);
        app.use("/api/*", auth_1.verifyAuthToken);
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
        console.error("Error setting up server:", error);
        process.exit(1);
    }
}
setUpServer();
