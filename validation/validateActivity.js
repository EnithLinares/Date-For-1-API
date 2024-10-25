import { body, validationResult } from "express-validator";

export const validateActivity = [
    body("name").notEmpty().withMessage("Name is required"),
    body("venue_name").notEmpty().withMessage("Venue is required"),
    body("time_of_day_id").notEmpty().withMessage("Time of Day is required"),
    body("mood_id").notEmpty().withMessage("Mood is required"),
    body("price_range_id").notEmpty().withMessage("Price Range is required"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Validation Errors:", errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
