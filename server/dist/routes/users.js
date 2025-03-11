"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUsersRoutes = registerUsersRoutes;
function registerUsersRoutes(app, mongoClient) {
    app.get("/api/users/:id", async (req, res) => {
        try {
            // get a users public profile
            console.log("not implemented");
        }
        catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });
    app.put("/api/users/:id", async (req, res) => {
        try {
            // update a users profile
            console.log("not implemented");
        }
        catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });
    app.delete("/api/users/:id", async (req, res) => {
        try {
            // delete a users profile
            console.log("not implemented");
        }
        catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });
}
