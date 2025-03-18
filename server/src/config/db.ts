import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;
const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

// For Mongoose ORM connections (schema-based)
export const connectMongoose = async (): Promise<typeof mongoose> => {
  try {
    console.log('Connecting to MongoDB with Mongoose...');
    await mongoose.connect(connectionString);
    console.log('MongoDB connected successfully with Mongoose');
    return mongoose;
  } catch (error) {
    console.error('MongoDB connection error with Mongoose:', error);
    throw error;
  }
};

// For native MongoDB driver connections (direct access to collections)
export const connectMongo = async (): Promise<MongoClient> => {
  try {
    console.log('Connecting to MongoDB with native driver...');
    const client = await MongoClient.connect(connectionString);
    console.log('MongoDB connected successfully with native driver');
    
    // List collections for verification
    const collections = await client.db().listCollections().toArray();
    console.log("Available collections:", collections.map(col => col.name));
    
    return client;
  } catch (error) {
    console.error('MongoDB connection error with native driver:', error);
    throw error;
  }
};

// Get the database name from environment
export const getDbName = (): string => {
  return DB_NAME || 'study_app';
};

// For closing connections
export const closeMongooseConnection = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('Mongoose connection closed');
  } catch (error) {
    console.error('Error closing Mongoose connection:', error);
    throw error;
  }
};
