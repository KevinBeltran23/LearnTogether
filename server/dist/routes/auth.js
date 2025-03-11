"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAuthRoutes = registerAuthRoutes;
function registerAuthRoutes(app, mongoClient) {
    app.post("/api/auth/register", async (req, res) => {
        try {
            // register a user
            console.log("not implemented");
        }
        catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });
    app.post("/api/auth/login", async (req, res) => {
        try {
            // authenticate a user
            console.log("not implemented");
        }
        catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });
    app.post("/api/auth/logout", async (req, res) => {
        try {
            // log out a user
            console.log("not implemented");
        }
        catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });
    app.get("/api/auth/me", async (req, res) => {
        try {
            // get a users profile (protected)
            console.log("not implemented");
        }
        catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });
}
