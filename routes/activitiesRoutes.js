import express from "express";
import multer from "multer";
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
import upload from "../multerConfig.js";

const router = express.Router();

router.get("/", getFilteredActivities);
router.get("/all", getAllActivities);
router.get("/search", searchActivities);

router.post(
    "/",
    (req, res, next) => {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: err.message });
            } else if (err) {
                return res.status(400).json({ error: err.message });
            }
            next();
        });
    },
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
