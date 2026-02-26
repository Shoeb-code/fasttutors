
import express from "express"
import { getStudyMaterialsByStudent } from "../controller/getStudyMaterial.js";


 export const studentRouter= express.Router();

studentRouter.get('/study-materials',getStudyMaterialsByStudent);
