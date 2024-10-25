import express from "express";
import {
    getVenues,
    getMoods,
    getPriceRanges,
    getTimesOfDay,
} from "../controllers/optionsController.js";

const router = express.Router();

router.get("/moods", getMoods);
router.get("/venues", getVenues);
router.get("/price-ranges", getPriceRanges);
router.get("/times-of-day", getTimesOfDay);

export default router;
