"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsProvider = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class CredentialsProvider {
    collection;
    constructor(mongoClient) {
        const COLLECTION_NAME = process.env.CREDS_COLLECTION_NAME;
        if (!COLLECTION_NAME) {
            throw new Error("Missing CREDS_COLLECTION_NAME from env file");
        }
        this.collection = mongoClient.db().collection(COLLECTION_NAME);
    }
    async registerUser(username, plaintextPassword) {
        const existingUser = await this.collection.findOne({ username });
        if (existingUser) {
            return false; // User already exists
        }
        // Generate salt and hash the password
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(plaintextPassword, salt);
        await this.collection.insertOne({
            username: username,
            password: hashedPassword
        });
        return true; // Registration successful
    }
    async verifyPassword(username, plaintextPassword) {
        const userRecord = await this.collection.findOne({ username });
        if (!userRecord) {
            return false; // User does not exist
        }
        // Compare the provided password with the stored hashed password
        return await bcrypt_1.default.compare(plaintextPassword, userRecord.password);
    }
}
exports.CredentialsProvider = CredentialsProvider;
