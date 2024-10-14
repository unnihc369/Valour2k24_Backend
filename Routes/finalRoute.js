import express, { Router } from "express";
import { verifyToken } from './authMiddleware.js';

import {
    getAllFinal,
    getFinalById,
    addFinal,
    editFinal,
    deleteFinal  
} from "../Controllers/finalController.js";

const router = express.Router();

router.get("/",getAllFinal)
router.get("/:id",getFinalById)
router.post("/", verifyToken, addFinal)
router.put("/:id", verifyToken, editFinal)
router.delete("/:id", verifyToken, deleteFinal)

export default router;