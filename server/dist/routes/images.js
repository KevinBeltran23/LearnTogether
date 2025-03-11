"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerImageRoutes = registerImageRoutes;
const imageProvider_1 = require("@/database/imageProvider");
function registerImageRoutes(app, mongoClient) {
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
}
