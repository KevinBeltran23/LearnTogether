import mongoose, { Document, Schema } from "mongoose";

interface IPost extends Document {
    title: string;
    username: string;
    type: string;
    date: Date;
    school?: string;
    location?: string;
}

const postsSchema: Schema<IPost> = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            required: true,
            trim: true,
        },
        date: { 
            type: Date,
            required: true,
            trim: true,
        },
        school: {
            type: String,
            required: false,
            trim: true,
        },
        location: {
            type: String,
            required: false,
            trim: true,
        },
    },
    { collection: "posts" }
);

const posts = mongoose.model("posts", postsSchema);

export default posts;
