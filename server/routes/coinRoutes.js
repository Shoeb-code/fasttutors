import express from "express";
import protectTutor from "../middleware/TutorProtect.js";
import { buyCoins, getCoinPackages } from "../controllers/coinController.js";

const router = express.Router();

router.get("/packages", getCoinPackages);
router.post("/buy", protectTutor, buyCoins);

export default router;
