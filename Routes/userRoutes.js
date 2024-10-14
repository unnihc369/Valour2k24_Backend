// userRoutes.js
import express from 'express';
import { registerUser, loginUser, getProtectedResource } from '../Controllers/userController.js';
import { verifyToken, authorizeRoles } from './authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/protected', verifyToken, authorizeRoles('admin', 'chess', 'tennis'), getProtectedResource);

export default router;
