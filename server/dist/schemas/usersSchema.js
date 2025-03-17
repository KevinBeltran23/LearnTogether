"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const usersSchema = new mongoose_1.default.Schema({
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
}, { collection: "users" });
const users = mongoose_1.default.model("users", usersSchema);
exports.default = users;
