import express from 'express'
import { verifyToken } from './authMiddleware.js';

import {
    addTennis,
    getAllTennis,
    getTennisById,
    editTennis,
    deleteTennis,
    editScores
} from '../Controllers/tennisController.js';

const router = express.Router();

router.get('/', getAllTennis);
router.get('/:id', getTennisById);
router.post('/', verifyToken, addTennis);
router.put('/:id', verifyToken, editTennis);
router.delete('/:id', verifyToken, deleteTennis);
router.put('/:id/scores', verifyToken, editScores);

export default router;