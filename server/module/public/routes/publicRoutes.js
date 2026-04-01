
import express from "express"
import getTuitions from "../controller/getAllTuitions.js";
import filterTuitions from "../controller/filterTuitions.js";

const publicRoute=express.Router();

publicRoute.get('/public/all-tuitions',getTuitions);
publicRoute.get('/public/filter-tuitions',filterTuitions);

export default publicRoute;