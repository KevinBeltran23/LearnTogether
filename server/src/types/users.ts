import { Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    darkMode: boolean;
    school?: string;
    location?: string;
}