import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import * as userService from '../services/userServices';

export const registerUsersRoutes = (app: express.Application, mongoClient: MongoClient) => {
  const router = express.Router();

  // Get current user profile
  router.get('/profile', async (req: Request, res: Response) => {
    try {
      // Assuming user ID is set in req.user by the verifyAuthToken middleware
      const userId = (req as any).user?.id;
      
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
      }
      
      const user = await userService.getUserById(userId);
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      }
      
      // Remove sensitive information
      const userProfile = user?.toObject();
      if (userProfile) {
        delete userProfile.password;
        delete userProfile.securitySettings;
        res.json(userProfile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Update user profile
  router.put('/profile', async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id;
      
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
      }
      
      // Don't allow updating password via this route
      const { password, ...updates } = req.body;
      
      const updatedUser = await userService.updateUser(userId, updates);
      
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
      }
      
      // Remove sensitive information
      const userProfile = updatedUser?.toObject();
      delete userProfile.password;
      delete userProfile.securitySettings;
      
      res.json(userProfile);
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Find study partners
  router.get('/study-partners', async (req: Request, res: Response) => {
    try {
      const { subjects, preferredStudyStyle, preferredStudyEnvironment, location } = req.query;
      
      const criteria: any = {};
      
      if (subjects) {
        criteria.subjects = Array.isArray(subjects) 
          ? subjects 
          : subjects.toString().split(',');
      }
      
      if (preferredStudyStyle) {
        criteria.preferredStudyStyle = preferredStudyStyle.toString();
      }
      
      if (preferredStudyEnvironment) {
        criteria.preferredStudyEnvironment = preferredStudyEnvironment.toString();
      }
      
      if (location) {
        criteria.location = location.toString();
      }
      
      const partners = await userService.findStudyPartners(criteria);
      
      res.json(partners);
    } catch (error) {
      console.error('Error finding study partners:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Mount the router
  app.use('/api/users', router);
};