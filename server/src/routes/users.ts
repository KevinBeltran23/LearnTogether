import express, { Request, Response } from 'express';
import * as userService from '../services/userServices';

export const registerUsersRoutes = (app: express.Application) => {
  // Create new user profile
  app.post('/api/users/profile', async (req: Request, res: Response) => {
    try {
      // The verifyAuthToken middleware has already validated the token
      // and stored the decoded token info (including email) in res.locals.token
      const authenticatedEmail = res.locals.token.email;

      if (!authenticatedEmail) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      
      // Use the data from the request body
      const userData = req.body;
      
      // The email in the request body must match the email in the authenticated token
      if (userData.email !== authenticatedEmail) {
        res.status(403).json({ error: 'Email in request body must match authenticated user' });
        return;
      }
      
      // Create the user with the data from the request body
      const user = await userService.createUser(userData);
      
      const userProfile = user?.toObject();
      if (userProfile) {
        res.status(201).json(userProfile);
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // modify the authenticated users profile
  app.put('/api/users/profile', async (req: Request, res: Response) => {
    try {
      const authenticatedEmail = res.locals.token.email;

      if (!authenticatedEmail) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      
      const userData = req.body;
      
      if (userData.email && userData.email !== authenticatedEmail) {
        res.status(403).json({ error: 'Email in request body must match authenticated user' });
        return;
      }
      
      // prevent email updates
      const updatesWithEmail = {
        ...userData,
        email: authenticatedEmail
      };
      
      // Modify the user with the data from the request body
      const user = await userService.updateUserByEmail(authenticatedEmail, updatesWithEmail);
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      const userProfile = user.toObject();
      res.status(200).json(userProfile);
    } catch (error) {
      console.error('Error updating user profile:', error);
      // Check if it's a validation error
      if (error instanceof Error && 'name' in error && error.name === 'ValidationError') {
         res.status(400).json({ 
          error: 'Validation Error', 
          details: error.message 
        });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get current user profile
  app.get('/api/users/profile', async (req: Request, res: Response) => {
    try {
      // Get the authenticated email from the token
      const authenticatedEmail = res.locals.token.email;
      
      // Find user by the authenticated email
      const user = await userService.getUserByEmail(authenticatedEmail);
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      const userProfile = user.toObject();
      res.json(userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get user profile by slug (username)
  app.get('/api/users/profile/:slug', async (req: Request, res: Response) => {
    try {
      // Get the slug from the request parameters
      const slug = req.params.slug;
      
      // Find user by the slug
      const user = await userService.getUserByUsername(slug);
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      const userProfile = user.toObject();
      res.json(userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};