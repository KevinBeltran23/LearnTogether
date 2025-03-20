import Post from '../schemas/postsSchema';
import { IPost } from '../types/posts';

/**
 * Create a new post
 */
export const createPost = async (postData: Partial<IPost>): Promise<IPost> => {
  try {
    const newPost = new Post(postData);
    return await newPost.save();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

/**
 * Get all posts
 */
export const getAllPosts = async (): Promise<IPost[]> => {
  try {
    return await Post.find();
  } catch (error) {
    console.error('Error getting all posts:', error);
    throw error;
  }
};

/**
 * Get posts by email
 */
export const getPostsByEmail = async (email: string): Promise<IPost[] | null> => {
  try {
    return await Post.find({ email });
  } catch (error) {
    console.error(`Error getting posts with email ${email}:`, error);
    throw error;
  }
};


/**
 * Get post by ID
 */
export const getPostById = async (postId: string): Promise<IPost | null> => {
  try {
    return await Post.findById(postId);
  } catch (error) {
    console.error(`Error getting post with ID ${postId}:`, error);
    throw error;
  }
};

/**
 * Update post by ID
 */
export const updatePostById = async (postId: string, updates: Partial<IPost>): Promise<IPost | null> => {
  try {
    return await Post.findByIdAndUpdate(
      postId,
      { $set: updates },
      { new: true, runValidators: true }
    );
  } catch (error) {
    console.error(`Error updating post with ID ${postId}:`, error);
    throw error;
  }
};


/**
 * Delete post
 */
export const deletePostById = async (postId: string): Promise<IPost | null> => {
  try {
    return await Post.findByIdAndDelete(postId);
  } catch (error) {
    console.error(`Error deleting post with ID ${postId}:`, error);
    throw error;
  }
};