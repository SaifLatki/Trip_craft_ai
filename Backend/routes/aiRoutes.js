import express from "express";
import { generatePlan, regenerateDay } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate", generatePlan);
router.post("/regenerate-day", regenerateDay);

export default router;
