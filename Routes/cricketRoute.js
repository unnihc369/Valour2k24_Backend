import express from 'express';
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


router.post('/', createMatch);
router.get('/', getAllMatches);
router.get('/:id', getMatchById);
router.put('/:id', updateMatch); 
router.delete('/:id', deleteMatch); 
router.put('/:id/scores', updateScores);
router.put('/:id/wickets', updateWickets);
router.put('/:id/overs', updateOvers); 

export default router;
