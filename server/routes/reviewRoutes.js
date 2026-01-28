import express from "express";
import { addReview, getTutorReviews,editReview ,deleteReview} from "../controllers/reviewController.js";
import {protectStudent} from "../middleware/StudentProtect.js";

 const router =express.Router();
 
router.post("/", protectStudent, addReview);
router.get("/:tutorId", getTutorReviews);

// ✏️ Edit & 🗑️ Delete
router.put("/:reviewId", protectStudent, editReview);
router.delete("/:reviewId", protectStudent, deleteReview);

export default router;


