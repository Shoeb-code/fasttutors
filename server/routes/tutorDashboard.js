import express from "express";
import protectTutor from "../middleware/TutorProtect.js";
import {
  getTutorDashboard,
  updateDemoVideo,
} from "../controllers/tutorDashboard.js";

const router = express.Router();

router.get("/dashboard", protectTutor, getTutorDashboard);
router.put("/demo-video", protectTutor, updateDemoVideo);

export default router;
  