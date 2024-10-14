import express from 'express'
import { createTournament, getTournament, getTournaments, updateTournament, deleteTournament } from '../Controllers/tournamentController.js';
import { verifyToken } from './authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createTournament);
router.get('/', getTournaments);
router.get('/:id', getTournament);
router.put('/:id', verifyToken, updateTournament);
router.delete('/:id', verifyToken, deleteTournament);

export default router;
