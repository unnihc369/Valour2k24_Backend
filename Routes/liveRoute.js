import express from 'express';
import { verifyToken } from './authMiddleware.js';

import {
    addLive,
    deleteLive,
    getAllLive,
    getLiveById,
    editLive
} from '../Controllers/liveController.js'
const router = express.Router();

router.get('/', getAllLive);
router.get('/:id', getLiveById);
router.post('/', addLive);
router.put('/:id', verifyToken, editLive);
router.delete('/:id', verifyToken, deleteLive);

export default router;
