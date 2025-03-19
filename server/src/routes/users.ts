import express, { Request, Response } from 'express';
import * as userService from '../services/userServices';

export const registerUsersRoutes = (app: express.Application) => {
  // Create new user profile
  app.post('/api/users/profile', async (req: Request, res: Response) => {
    try {
      // The verifyAuthToken middleware has already validated the token
      // and stored the decoded token info (including email) in res.locals.token
      const authenticatedEmail = res.locals.token.email;
      
      // Use the data from the request body
      const userData = req.body;
      
      // Security check: The email in the request body must match 
      // the email in the authenticated token
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
};