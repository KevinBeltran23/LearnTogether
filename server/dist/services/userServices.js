"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findStudyPartners = exports.deleteUser = exports.updateUser = exports.getUserByUsername = exports.getUserByEmail = exports.getUserById = exports.createUser = void 0;
const usersSchema_1 = __importDefault(require("../schemas/usersSchema"));
/**
 * Create a new user
 */
const createUser = async (userData) => {
    try {
        const newUser = new usersSchema_1.default(userData);
        return await newUser.save();
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
exports.createUser = createUser;
/**
 * Get user by ID
 */
const getUserById = async (userId) => {
    try {
        return await usersSchema_1.default.findById(userId);
    }
    catch (error) {
        console.error(`Error getting user with ID ${userId}:`, error);
        throw error;
    }
};
exports.getUserById = getUserById;
/**
 * Get user by email
 */
const getUserByEmail = async (email) => {
    try {
        return await usersSchema_1.default.findOne({ email });
    }
    catch (error) {
        console.error(`Error getting user with email ${email}:`, error);
        throw error;
    }
};
exports.getUserByEmail = getUserByEmail;
/**
 * Get user by username
 */
const getUserByUsername = async (username) => {
    try {
        return await usersSchema_1.default.findOne({ username });
    }
    catch (error) {
        console.error(`Error getting user with username ${username}:`, error);
        throw error;
    }
};
exports.getUserByUsername = getUserByUsername;
/**
 * Update user
 */
const updateUser = async (userId, updates) => {
    try {
        return await usersSchema_1.default.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true });
    }
    catch (error) {
        console.error(`Error updating user with ID ${userId}:`, error);
        throw error;
    }
};
exports.updateUser = updateUser;
/**
 * Delete user
 */
const deleteUser = async (userId) => {
    try {
        return await usersSchema_1.default.findByIdAndDelete(userId);
    }
    catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error);
        throw error;
    }
};
exports.deleteUser = deleteUser;
/**
 * Find users by study criteria
 */
const findStudyPartners = async (criteria) => {
    try {
        const query = {};
        if (criteria.subjects && criteria.subjects.length > 0) {
            query.subjectsLookingToStudy = { $in: criteria.subjects };
        }
        if (criteria.preferredStudyStyle) {
            query.preferredStudyStyle = criteria.preferredStudyStyle;
        }
        if (criteria.preferredStudyEnvironment) {
            query.preferredStudyEnvironment = criteria.preferredStudyEnvironment;
        }
        if (criteria.location) {
            query.location = { $regex: criteria.location, $options: 'i' };
        }
        return await usersSchema_1.default.find(query)
            .select('-password -securitySettings') // Exclude sensitive information
            .limit(20);
    }
    catch (error) {
        console.error('Error finding study partners:', error);
        throw error;
    }
};
exports.findStudyPartners = findStudyPartners;
