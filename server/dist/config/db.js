"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeMongooseConnection = exports.getDbName = exports.connectMongo = exports.connectMongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;
const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;
// For Mongoose ORM connections (schema-based)
const connectMongoose = async () => {
    try {
        console.log('Connecting to MongoDB with Mongoose...');
        await mongoose_1.default.connect(connectionString);
        console.log('MongoDB connected successfully with Mongoose');
        return mongoose_1.default;
    }
    catch (error) {
        console.error('MongoDB connection error with Mongoose:', error);
        throw error;
    }
};
exports.connectMongoose = connectMongoose;
// For native MongoDB driver connections (direct access to collections)
const connectMongo = async () => {
    try {
        console.log('Connecting to MongoDB with native driver...');
        const client = await mongodb_1.MongoClient.connect(connectionString);
        console.log('MongoDB connected successfully with native driver');
        // List collections for verification
        const collections = await client.db().listCollections().toArray();
        console.log("Available collections:", collections.map(col => col.name));
        return client;
    }
    catch (error) {
        console.error('MongoDB connection error with native driver:', error);
        throw error;
    }
};
exports.connectMongo = connectMongo;
// Get the database name from environment
const getDbName = () => {
    return DB_NAME || 'study_app';
};
exports.getDbName = getDbName;
// For closing connections
const closeMongooseConnection = async () => {
    try {
        await mongoose_1.default.connection.close();
        console.log('Mongoose connection closed');
    }
    catch (error) {
        console.error('Error closing Mongoose connection:', error);
        throw error;
    }
};
exports.closeMongooseConnection = closeMongooseConnection;
