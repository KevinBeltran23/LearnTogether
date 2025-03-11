import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    username: string;
    password: string;
    darkMode: boolean;
    school?: string;
    location?: string;
}

const usersSchema: Schema<IUser> = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        darkMode: {
            type: Boolean,
            required: true,
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
    { collection: "users" }
);

const users = mongoose.model("users", usersSchema);

export default users;
