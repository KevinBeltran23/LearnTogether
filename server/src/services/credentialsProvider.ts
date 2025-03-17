import { Collection, MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { ICredentialsDocument } from "../types/auth";

export class CredentialsProvider {
    private readonly collection: Collection<ICredentialsDocument>;

    constructor(mongoClient: MongoClient) {
        const COLLECTION_NAME = process.env.CREDS_COLLECTION_NAME;
        if (!COLLECTION_NAME) {
            throw new Error("Missing CREDS_COLLECTION_NAME from env file");
        }
        this.collection = mongoClient.db().collection<ICredentialsDocument>(COLLECTION_NAME);
    }

    async registerUser(username: string, plaintextPassword: string) {
        const existingUser = await this.collection.findOne({ username });
        if (existingUser) {
            return false; // User already exists
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

        await this.collection.insertOne({
            username: username,
            password: hashedPassword
        });

        return true; // Registration successful
    }

    async verifyPassword(username: string, plaintextPassword: string): Promise<boolean> {
        const userRecord = await this.collection.findOne({ username });
        if (!userRecord) {
            return false; // User does not exist
        }
        // Compare the provided password with the stored hashed password
        return await bcrypt.compare(plaintextPassword, userRecord.password);
    }
}
