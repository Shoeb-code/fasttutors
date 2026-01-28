import express from "express";
import { getPublicTutorProfile } from "../controllers/tutorPublicController.js";

const router = express.Router();

router.get("/public/:tutorId", getPublicTutorProfile);

export default router;
