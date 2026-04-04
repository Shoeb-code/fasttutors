
import express from "express"
import getAllTuitions from "../controller/getAllTuitions.js"
import filterTuitions from "../controller/filterTuitions.js";

const publicRoute=express.Router();

publicRoute.get('/public/all-tuitions',getAllTuitions);
publicRoute.get('/public/filter-tuitions',filterTuitions);

export default publicRoute;