import express, { Request, Response } from 'express';
import * as postServices from '../services/postServices';

export const registerPostsRoutes = (app: express.Application) => {
  // Create a new post using the authenticated email
  app.post('/api/posts', async (req: Request, res: Response) => {
    try {
      const authenticatedEmail = res.locals.token?.email;

      if (!authenticatedEmail) {
        res.status(401).json({ error: 'Unauthorized - valid email required' });
        return;
      }
      
      if (!req.body) {
        res.status(400).json({ error: 'Invalid request body' });
        return;
      }
      
      const postData = req.body;
      
      // Ensure the post is created with the authenticated email
      if (postData.email !== authenticatedEmail) {
        res.status(403).json({ error: 'Email in request body must match authenticated user' });
        return;
      }
      
      // Create the post with the data from the request body
      const post = await postServices.createPost(postData);
      
      res.status(201).json(post);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // modify a post using the post ID and the authenticated email
  app.put('/api/posts/:id', async (req: Request, res: Response) => {
    try {
      const authenticatedEmail = res.locals.token?.email;

      if (!authenticatedEmail) {
        res.status(401).json({ error: 'Unauthorized - valid email required' });
        return;
      }
      
      if (!req.params.id) {
        res.status(400).json({ error: 'Post ID is required' });
        return;
      }
      
      if (!req.body) {
        res.status(400).json({ error: 'Invalid request body' });
        return;
      }
      
      const postId = req.params.id;
      const postData = req.body;
      
      // Ensure the post is created with the authenticated email
      if (postData.email !== authenticatedEmail) {
        res.status(403).json({ error: 'Email in request body must match authenticated user' });
        return;
      }

      const updatedPost = await postServices.updatePostById(postId, postData);
      
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);
      if (error instanceof Error && 'name' in error && error.name === 'ValidationError') {
         res.status(400).json({ 
          error: 'Validation Error', 
          details: error.message 
        });
        return;
      }
      // Check for MongoDB casting errors (invalid IDs)
      if (error instanceof Error && error.message.includes('Cast to ObjectId failed')) {
        res.status(400).json({ error: 'Invalid post ID format' });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get all posts
  app.get('/api/posts', async (req: Request, res: Response) => {
    try {
      const posts = await postServices.getAllPosts();
      res.json(posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get posts belonging to an email
  app.get('/api/posts/user/:email', async (req: Request, res: Response) => {
    try {
      const email = req.params.email;
      
      if (!email) {
        res.status(400).json({ error: 'Email parameter is required' });
        return;
      }
      
      const posts = await postServices.getPostsByEmail(email);
      
      res.json(posts || []);
    } catch (error) {
      console.error('Error fetching user posts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get a single post by ID
  app.get('/api/posts/:id', async (req: Request, res: Response) => {
    try {
      if (!req.params.id) {
        res.status(400).json({ error: 'Post ID is required' });
        return;
      }
      
      const postId = req.params.id;
      
      let post;
      try {
        post = await postServices.getPostById(postId);
      } catch (err) {
        if (err instanceof Error && err.message.includes('Cast to ObjectId failed')) {
          res.status(400).json({ error: 'Invalid post ID format' });
          return;
        }
        throw err; 
      }
      
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }
      
      res.json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.delete('/api/posts/:id', async (req: Request, res: Response) => {
    try {
      const authenticatedEmail = res.locals.token?.email;

      if (!authenticatedEmail) {
        res.status(401).json({ error: 'Unauthorized - valid email required' });
        return;
      }

      if (!req.params.id) {
        res.status(400).json({ error: 'Post ID is required' });
        return;
      }

      const postId = req.params.id;
      
      // Get the post to verify ownership since deletes do not require a body
      let existingPost;
      try {
        existingPost = await postServices.getPostById(postId);
      } catch (err) {
        console.error(`Error retrieving post for validation: ${err}`);
        if (err instanceof Error && err.message.includes('Cast to ObjectId failed')) {
          res.status(400).json({ error: 'Invalid post ID format' });
          return;
        }
        throw err;
      }
      
      if (!existingPost) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }
      
      // Check if the authenticated email matches the post owner's email
      if (existingPost.email !== authenticatedEmail) {
        res.status(403).json({ 
          error: 'Unauthorized: You can only delete your own posts',
          requestingUser: authenticatedEmail,
          postOwner: existingPost.email
        });
        return;
      }
      
      const deletedPost = await postServices.deletePostById(postId);
      
      res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
    } catch (error) {
      console.error('Error deleting post:', error);
      // MongoDB casting errors (invalid IDs)
      if (error instanceof Error && error.message.includes('Cast to ObjectId failed')) {
        res.status(400).json({ error: 'Invalid post ID format' });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};