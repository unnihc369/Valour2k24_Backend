import express from 'express'

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
router.post('/', addTennis);
router.put('/:id', editTennis);
router.delete('/:id', deleteTennis);
router.put('/:id/scores', editScores);

export default router;