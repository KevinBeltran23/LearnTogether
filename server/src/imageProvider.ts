import { MongoClient } from "mongodb";

export interface UserDocument {
  _id: string;
  username: string;
  email: string;
}

export interface ImageDocument {
  _id: string;
  src: string;
  name: string;
  author?: string | {
    _id: string;
    username: string;
  };
  likes: number;
}

export class ImageProvider {
  constructor(private readonly mongoClient: MongoClient) {}
 
  async getAllImages(): Promise<ImageDocument[]> {
    const collectionName = process.env.IMAGES_COLLECTION_NAME;
    if (!collectionName) {
      throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
    }
   
    const collection = this.mongoClient.db().collection<ImageDocument>(collectionName);
   
    // Use aggregation pipeline to join with users collection
    const images = await collection.aggregate<ImageDocument>([
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
   
    return images as ImageDocument[];
  }
}