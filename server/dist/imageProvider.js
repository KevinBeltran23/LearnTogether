"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProvider = void 0;
class ImageProvider {
    mongoClient;
    constructor(mongoClient) {
        this.mongoClient = mongoClient;
    }
    async getAllImages() {
        const collectionName = process.env.IMAGES_COLLECTION_NAME;
        if (!collectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }
        const collection = this.mongoClient.db().collection(collectionName);
        // Use aggregation pipeline to join with users collection
        const images = await collection.aggregate([
            {
                $lookup: {
                    from: process.env.USERS_COLLECTION_NAME || "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "authorDetails"
                }
            },
            {
                $addFields: {
                    author: {
                        $cond: {
                            if: { $gt: [{ $size: "$authorDetails" }, 0] },
                            then: {
                                _id: { $arrayElemAt: ["$authorDetails._id", 0] },
                                username: { $arrayElemAt: ["$authorDetails.username", 0] }
                            },
                            else: "$author"
                        }
                    }
                }
            },
            {
                $project: {
                    authorDetails: 0
                }
            }
        ]).toArray();
        return images;
    }
}
exports.ImageProvider = ImageProvider;
