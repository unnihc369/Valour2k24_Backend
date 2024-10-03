// userRoutes.js
import express from 'express';
import { registerUser, loginUser, getProtectedResource } from '../Controllers/userController.js';
import { verifyToken, authorizeRoles } from './authMiddleware.js';

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Protected route example (requires token)
router.get('/protected', verifyToken, authorizeRoles('admin', 'chess', 'tennis'), getProtectedResource);

export default router;
