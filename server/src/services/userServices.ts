import User from '../schemas/usersSchema';
import { IUser } from '../types/users';

/**
 * Create a new user
 */
export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  try {
    const newUser = new User(userData);
    return await newUser.save();
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (userId: string): Promise<IUser | null> => {
  try {
    return await User.findById(userId);
  } catch (error) {
    console.error(`Error getting user with ID ${userId}:`, error);
    throw error;
  }
};

/**
 * Get user by email
 */
export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    console.error(`Error getting user with email ${email}:`, error);
    throw error;
  }
};

/**
 * Get user by username
 */
export const getUserByUsername = async (username: string): Promise<IUser | null> => {
  try {
    return await User.findOne({ username });
  } catch (error) {
    console.error(`Error getting user with username ${username}:`, error);
    throw error;
  }
};

/**
 * Update user by ID
 */
export const updateUserById = async (userId: string, updates: Partial<IUser>): Promise<IUser | null> => {
  try {
    return await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

/**
 * Update user by email
 */
export const updateUserByEmail = async (email: string, updates: Partial<IUser>): Promise<IUser | null> => {
  try {
    return await User.findOneAndUpdate(
      { email },
      { $set: updates },
      { new: true, runValidators: true }
    );
  } catch (error) {
    console.error(`Error updating user with email ${email}:`, error);
    throw error;
  }
};

/**
 * Delete user
 */
export const deleteUser = async (userId: string): Promise<IUser | null> => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};

/**
 * Find users by study criteria
 */
export const findStudyPartners = async (criteria: {
  subjects?: string[];
  preferredStudyStyle?: string;
  preferredStudyEnvironment?: string;
  location?: string;
}): Promise<IUser[]> => {
  try {
    const query: any = {};
    
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
    
    return await User.find(query)
      .select('-password -securitySettings') // Exclude sensitive information
      .limit(20);
  } catch (error) {
    console.error('Error finding study partners:', error);
    throw error;
  }
};