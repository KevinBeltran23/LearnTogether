import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/users";

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
            default: false,
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
