"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPostsRoutes = registerPostsRoutes;
const auth_1 = require("../routes/auth");
function registerPostsRoutes(app, mongoClient) {
    app.get("/api/posts", auth_1.verifyAuthToken, async (req, res) => {
        try {
            // get all the posts here from mongodb
            console.log("not implemented");
        }
        catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });
    app.post("/api/posts", auth_1.verifyAuthToken, async (req, res) => {
        try {
            // create a post
            console.log("not implemented");
        }
        catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });
    app.put("/api/posts/:id", auth_1.verifyAuthToken, async (req, res) => {
        try {
            // update a post
            console.log("not implemented");
        }
        catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });
    app.delete("/api/posts/:id", auth_1.verifyAuthToken, async (req, res) => {
        try {
            // delete a post
            console.log("not implemented");
        }
        catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });
}
