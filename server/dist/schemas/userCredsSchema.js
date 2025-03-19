"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userCredsSchema = new mongoose_1.default.Schema({
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
}, {
    collection: "userCreds",
    timestamps: true // Adds createdAt and updatedAt fields automatically
});
// Create indexes for better query performance
userCredsSchema.index({ email: 1 }, { unique: true });
// Create the model
const userCreds = mongoose_1.default.model("userCreds", userCredsSchema);
exports.default = userCreds;
