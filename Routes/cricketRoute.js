import express from 'express';
import { verifyToken } from './authMiddleware.js';

import {
    createMatch,
    getAllMatches,
    getMatchById,
    updateMatch,
    deleteMatch,
    updateScores,
    updateWickets,
    updateOvers
} from '../Controllers/cricketController.js'; 

const router = express.Router();


router.post('/', verifyToken, createMatch);
router.get('/', getAllMatches);
router.get('/:id', getMatchById);
router.put('/:id', verifyToken, updateMatch); 
router.delete('/:id', verifyToken, deleteMatch); 
router.put('/:id/scores', updateScores);
router.put('/:id/wickets', updateWickets);
router.put('/:id/overs', updateOvers); 

export default router;
