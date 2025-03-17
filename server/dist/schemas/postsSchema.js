"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postsSchema = new mongoose_1.default.Schema({
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
}, { collection: "posts" });
const posts = mongoose_1.default.model("posts", postsSchema);
exports.default = posts;
