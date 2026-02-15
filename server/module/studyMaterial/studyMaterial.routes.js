import express from "express";
import { getStudyMaterials } from "./studyMaterial.controller.js";

const router = express.Router();

router.get("/", getStudyMaterials);

export default router;
