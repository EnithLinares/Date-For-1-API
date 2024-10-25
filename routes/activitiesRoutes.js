import express from "express";
import upload from "../multerConfig.js";
import {
    getAllActivities,
    createActivity,
    getActivityById,
    updateActivity,
    deleteActivity,
    searchActivities,
    getFilteredActivities,
} from "../controllers/activitiesController.js";
import { validateActivity } from "../validation/validateActivity.js";

const router = express.Router();

router.get("/", getFilteredActivities);
router.get("/all", getAllActivities);
router.get("/search", searchActivities);

router.post(
    "/", // Correct path
    upload.single("image"),
    validateActivity,
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
