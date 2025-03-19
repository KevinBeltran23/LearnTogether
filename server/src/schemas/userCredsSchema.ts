import mongoose, { Schema } from "mongoose";
import { IUserCreds } from "../types/auth";

const userCredsSchema: Schema<IUserCreds> = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // Store emails in lowercase for case-insensitive matching
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] // Basic email validation
    },
    password: {
      type: String,
      required: true
    }
  },
  { 
    collection: "userCreds",
    timestamps: true // Adds createdAt and updatedAt fields automatically
  }
);

// Create indexes for better query performance
userCredsSchema.index({ email: 1 }, { unique: true });

// Create the model
const userCreds = mongoose.model<IUserCreds>("userCreds", userCredsSchema);

export default userCreds;
