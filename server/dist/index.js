"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./routes/auth");
const authServices_1 = require("./services/authServices");
const users_1 = require("./routes/users");
const db_1 = require("./config/db");
const path_1 = __importDefault(require("path"));
const posts_1 = require("./routes/posts");
dotenv_1.default.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 9000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
async function setUpServer() {
    try {
        // Connect to MongoDB using Mongoose (for schema-based operations)
        await (0, db_1.connectMongoose)();
        console.log("Mongoose connected - Schemas initialized");
        const mongoClient = await (0, db_1.connectMongo)();
        app.get("/hello", (req, res) => {
            res.json({ message: "Hello, world!" });
        });
        (0, auth_1.registerAuthRoutes)(app);
        app.use("/api/*", authServices_1.verifyAuthToken);
        (0, users_1.registerUsersRoutes)(app);
        (0, posts_1.registerPostsRoutes)(app);
        app.get("*", (req, res) => {
            console.log("none of the routes above me were matched");
        });
        // Serve the Next.js static files
        const clientBuildPath = path_1.default.join(__dirname, '../../client/out');
        app.use(express_1.default.static(clientBuildPath));
        // This route handles client-side routing in Next.js
        app.get('*', (req, res) => {
            // API routes should be handled by your server routes
            if (req.path.startsWith('/api')) {
                res.status(404).send('API endpoint not found');
            }
            // For everything else, serve the index.html
            res.sendFile(path_1.default.join(clientBuildPath, 'index.html'));
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
