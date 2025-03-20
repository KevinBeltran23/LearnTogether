"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostById = exports.updatePostById = exports.getPostById = exports.getPostsByEmail = exports.getAllPosts = exports.createPost = void 0;
const postsSchema_1 = __importDefault(require("../schemas/postsSchema"));
/**
 * Create a new post
 */
const createPost = async (postData) => {
    try {
        const newPost = new postsSchema_1.default(postData);
        return await newPost.save();
    }
    catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};
exports.createPost = createPost;
/**
 * Get all posts
 */
const getAllPosts = async () => {
    try {
        return await postsSchema_1.default.find();
    }
    catch (error) {
        console.error('Error getting all posts:', error);
        throw error;
    }
};
exports.getAllPosts = getAllPosts;
/**
 * Get posts by email
 */
const getPostsByEmail = async (email) => {
    try {
        return await postsSchema_1.default.find({ email });
    }
    catch (error) {
        console.error(`Error getting posts with email ${email}:`, error);
        throw error;
    }
};
exports.getPostsByEmail = getPostsByEmail;
/**
 * Get post by ID
 */
const getPostById = async (postId) => {
    try {
        return await postsSchema_1.default.findById(postId);
    }
    catch (error) {
        console.error(`Error getting post with ID ${postId}:`, error);
        throw error;
    }
};
exports.getPostById = getPostById;
/**
 * Update post by ID
 */
const updatePostById = async (postId, updates) => {
    try {
        return await postsSchema_1.default.findByIdAndUpdate(postId, { $set: updates }, { new: true, runValidators: true });
    }
    catch (error) {
        console.error(`Error updating post with ID ${postId}:`, error);
        throw error;
    }
};
exports.updatePostById = updatePostById;
/**
 * Delete post
 */
const deletePostById = async (postId) => {
    try {
        return await postsSchema_1.default.findByIdAndDelete(postId);
    }
    catch (error) {
        console.error(`Error deleting post with ID ${postId}:`, error);
        throw error;
    }
};
exports.deletePostById = deletePostById;
