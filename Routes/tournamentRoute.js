import express from 'express'
import { createTournament, getTournament, getTournaments, updateTournament, deleteTournament } from '../Controllers/tournamentController.js';

const router = express.Router();

router.post('/', createTournament);
router.get('/', getTournaments);
router.get('/:id', getTournament);
router.put('/:id', updateTournament);
router.delete('/:id', deleteTournament);

export default router;
