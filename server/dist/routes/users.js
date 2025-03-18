"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUsersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userService = __importStar(require("../services/userServices"));
const registerUsersRoutes = (app, mongoClient) => {
    const router = express_1.default.Router();
    // Get current user profile
    router.get('/profile', async (req, res) => {
        try {
            // Assuming user ID is set in req.user by the verifyAuthToken middleware
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ error: 'Unauthorized' });
            }
            const user = await userService.getUserById(userId);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
            }
            const userProfile = user?.toObject();
            if (userProfile) {
                res.json(userProfile);
            }
        }
        catch (error) {
            console.error('Error fetching user profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    // Create new user profile
    router.post('/profile', async (req, res) => {
        try {
            // Assuming user ID is set in req.user by the verifyAuthToken middleware
            const userData = req.user;
            if (!userData) {
                res.status(401).json({ error: 'Unauthorized' });
            }
            const user = await userService.createUser(userData);
            const userProfile = user?.toObject();
            if (userProfile) {
                res.json(userProfile);
            }
        }
        catch (error) {
            console.error('Error creating user profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    // Update user profile
    router.put('/profile', async (req, res) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ error: 'Unauthorized' });
            }
            // Don't allow updating password via this route
            const { password, ...updates } = req.body;
            const updatedUser = await userService.updateUser(userId, updates);
            if (!updatedUser) {
                res.status(404).json({ error: 'User not found' });
            }
            const userProfile = updatedUser?.toObject();
            res.json(userProfile);
        }
        catch (error) {
            console.error('Error updating user profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    // Find study partners
    router.get('/study-partners', async (req, res) => {
        try {
            const { subjects, preferredStudyStyle, preferredStudyEnvironment, location } = req.query;
            const criteria = {};
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
        }
        catch (error) {
            console.error('Error finding study partners:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    // Mount the router
    app.use('/api/users', router);
};
exports.registerUsersRoutes = registerUsersRoutes;
