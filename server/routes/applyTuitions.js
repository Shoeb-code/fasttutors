
import express from "express" ;
import { applyForTuition } from "../controllers/tutorApplyController.js";
import protectTutor from "../middleware/TutorProtect.js";
import { getTutorRequests } from "../controllers/getTutorRequests.js";
import { getTutorApplyHistory } from "../controllers/tutorApplyHistoryController.js";
import { deleteTutorApplyHistory } from "../controllers/deleteTutorApplyHistory.js";



const applyRouter=express.Router();

applyRouter.get("/request", protectTutor, getTutorRequests);
applyRouter.post('/apply',protectTutor,applyForTuition)


applyRouter.get("/apply-history", protectTutor, getTutorApplyHistory);
applyRouter.delete("/apply-history/:id", protectTutor, deleteTutorApplyHistory);


export  default applyRouter; 