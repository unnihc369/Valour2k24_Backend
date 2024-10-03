import express, { Router } from "express";
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
router.post("/",addFinal)
router.put("/:id",editFinal)
router.delete("/:id", deleteFinal)

export default router;