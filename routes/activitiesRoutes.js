import express from "express";
import {
    getAllActivities,
    createActivity,
    getActivityById,
    updateActivity,
    deleteActivity,
    searchActivities,
    getFilteredActivities,
} from "../controllers/activitiesController.js";
import { validateActivity } from "../validation/activityValidation.js";
import { validationResult } from "express-validator";

const router = express.Router();

router.get("/", getFilteredActivities);
router.get("/all", getAllActivities);
router.get("/search", searchActivities);
router.post(
    "/",
    validateActivity,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createActivity
);

router.get("/:id", getActivityById);
router.put(
    "/:id",
    validateActivity,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    updateActivity
);

router.delete("/:id", deleteActivity);

export default router;
