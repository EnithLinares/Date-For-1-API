import express from "express";
import {
    getAllVenues,
    getVenueById,
    updateVenue,
    deleteVenue,
} from "../controllers/venuesController.js";
import { validationResult } from "express-validator";

const router = express.Router();

router.get("/", getAllVenues);

router.get("/:id", getVenueById);

router.put(
    "/:id",
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    updateVenue
);

router.delete("/:id", deleteVenue);

export default router;
