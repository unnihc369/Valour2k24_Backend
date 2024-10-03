import express from 'express';
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
router.put('/:id', editLive);
router.delete('/:id', deleteLive);

export default router;
