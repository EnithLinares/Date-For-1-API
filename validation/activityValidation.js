import { body } from "express-validator";
import db from "../knexfile.js";

export const validateActivity = [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("venue_name").notEmpty().withMessage("Venue name is required"),
    body("postal_code")
        .matches(/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/)
        .withMessage("Invalid Canadian postal code format"),
    body("time_of_day_id")
        .custom(async (value) => checkExists(value, "times_of_day"))
        .withMessage("Invalid Time of Day ID"),
    body("mood_id")
        .custom(async (value) => checkExists(value, "moods"))
        .withMessage("Invalid Mood ID"),
    body("price_range_id")
        .custom(async (value) => checkExists(value, "price_ranges"))
        .withMessage("Invalid Price Range ID"),
];

async function checkExists(value, tableName) {
    const exists = await db(tableName).where({ id: value }).first();
    return !!exists;
}
