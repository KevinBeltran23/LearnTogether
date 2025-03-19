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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUsersRoutes = void 0;
const userService = __importStar(require("../services/userServices"));
const registerUsersRoutes = (app) => {
    // Create new user profile
    app.post('/api/users/profile', async (req, res) => {
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
        }
        catch (error) {
            console.error('Error creating user profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    // Get current user profile
    app.get('/api/users/profile', async (req, res) => {
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
        }
        catch (error) {
            console.error('Error fetching user profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
};
exports.registerUsersRoutes = registerUsersRoutes;
