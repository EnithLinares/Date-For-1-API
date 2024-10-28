import db from "../db.js";
import { validationResult } from "express-validator";

// Get all activities
export const getAllActivities = async (req, res) => {
    try {
        const activities = await db("activities").select("*");
        res.json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch activities" });
    }
};

//Search activities query endpoint
export const searchActivities = async (req, res) => {
    try {
        const { query } = req.query;

        const results = await db("activities")
            .distinct(
                "activities.id",
                "activities.name",
                "activities.description"
            )
            .join("venues", "activities.venue_id", "venues.id")
            .join(
                "activity_moods",
                "activities.id",
                "activity_moods.activity_id"
            )
            .join("moods", "activity_moods.mood_id", "moods.id")
            .join(
                "activity_price_ranges",
                "activities.id",
                "activity_price_ranges.activity_id"
            )
            .join(
                "price_ranges",
                "activity_price_ranges.price_range_id",
                "price_ranges.id"
            )
            .where(function () {
                this.where("activities.name", "like", `%${query}%`)
                    .orWhere("activities.description", "like", `%${query}%`)
                    .orWhere("moods.name", "like", `%${query}%`)
                    .orWhere("price_ranges.range", "like", `%${query}%`)
                    .orWhere("venues.name", "like", `%${query}%`);
            });

        res.setHeader("Content-Type", "application/json");
        res.json(results);
    } catch (error) {
        console.error("Error performing search:", error);
        res.status(500).json({ error: "Failed to perform search" });
    }
};

export const getFilteredActivities = async (req, res) => {
    try {
        const { mood, timeOfDay, priceRange, venue } = req.query;

        const query = db("activities")
            .select(
                "activities.id",
                "activities.name",
                "activities.description",
                "activities.image_url",
                "venues.name as venue_name",
                db.raw(
                    "GROUP_CONCAT(DISTINCT times_of_day.name) as times_of_day"
                ),
                db.raw(
                    "GROUP_CONCAT(DISTINCT price_ranges.range) as price_ranges"
                )
            )
            .join(
                "activity_moods",
                "activities.id",
                "activity_moods.activity_id"
            )
            .join("moods", "activity_moods.mood_id", "moods.id")
            .join(
                "activity_price_ranges",
                "activities.id",
                "activity_price_ranges.activity_id"
            )
            .join(
                "price_ranges",
                "activity_price_ranges.price_range_id",
                "price_ranges.id"
            )
            .join(
                "activity_times",
                "activities.id",
                "activity_times.activity_id"
            )
            .join(
                "times_of_day",
                "activity_times.time_of_day_id",
                "times_of_day.id"
            )
            .join("venues", "activities.venue_id", "venues.id")
            .groupBy("activities.id", "venues.name");

        if (mood) query.where("moods.name", mood);
        if (timeOfDay) query.where("times_of_day.name", timeOfDay);
        if (priceRange) query.where("price_ranges.range", priceRange);
        if (venue) query.where("venues.id", venue);

        const results = await query;

        res.json(results);
    } catch (error) {
        console.error("Error fetching activities:", error);
        res.status(500).json({ error: "Failed to fetch activities" });
    }
};

export const createActivity = async (req, res) => {
    try {
        const {
            name,
            description,
            venue_name,
            time_of_day_id,
            mood_id,
            price_range_id,
        } = req.body;

        const image_url = req.file ? `/uploads/${req.file.filename}` : null;

        let venue = await db("venues").where({ name: venue_name }).first();

        if (!venue) {
            [venue] = await db("venues")
                .insert({ name: venue_name })
                .returning("*");
        }

        const [id] = await db("activities").insert({
            name,
            description,
            venue_id: venue.id,
            image_url,
        });

        await db("activity_times").insert({ activity_id: id, time_of_day_id });
        await db("activity_moods").insert({ activity_id: id, mood_id });
        await db("activity_price_ranges").insert({
            activity_id: id,
            price_range_id,
        });

        res.status(201).json({ id });
    } catch (error) {
        console.error("Error creating activity:", error);
        res.status(500).json({ error: "Failed to create activity" });
    }
};

// Get a specific activity by ID
export const getActivityById = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await db("activities")
            .select(
                "activities.id",
                "activities.name",
                "activities.description",
                "activities.image_url",
                "venues.name as venue_name",
                "venues.address as venue_address",
                "venues.website_url as venue_website", // Correct column name
                db.raw(
                    "GROUP_CONCAT(DISTINCT times_of_day.name) as times_of_day"
                ),
                db.raw(
                    "GROUP_CONCAT(DISTINCT price_ranges.range) as price_ranges"
                ),
                db.raw("GROUP_CONCAT(DISTINCT moods.name) as moods")
            )
            .leftJoin(
                "activity_moods",
                "activities.id",
                "activity_moods.activity_id"
            )
            .leftJoin("moods", "activity_moods.mood_id", "moods.id")
            .leftJoin(
                "activity_price_ranges",
                "activities.id",
                "activity_price_ranges.activity_id"
            )
            .leftJoin(
                "price_ranges",
                "activity_price_ranges.price_range_id",
                "price_ranges.id"
            )
            .leftJoin(
                "activity_times",
                "activities.id",
                "activity_times.activity_id"
            )
            .leftJoin(
                "times_of_day",
                "activity_times.time_of_day_id",
                "times_of_day.id"
            )
            .leftJoin("venues", "activities.venue_id", "venues.id")
            .where("activities.id", id)
            .groupBy(
                "activities.id",
                "venues.name",
                "venues.address",
                "venues.website_url"
            )
            .first();

        if (activity) {
            res.json(activity);
        } else {
            res.status(404).json({ error: "Activity not found" });
        }
    } catch (error) {
        console.error("Error fetching activity:", error);
        res.status(500).json({ error: "Failed to fetch activity" });
    }
};

// Update an activity by ID
export const updateActivity = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const changes = req.body;

        // Ensure valid venue update if included
        if (changes.venue_name && changes.postal_code) {
            let venue = await db("venues")
                .where({
                    name: changes.venue_name,
                    postal_code: changes.postal_code,
                })
                .first();
            if (!venue) {
                [venue] = await db("venues")
                    .insert({
                        name: changes.venue_name,
                        postal_code: changes.postal_code,
                    })
                    .returning("*");
                changes.venue_id = venue.id;
            }
        }

        const count = await db("activities").where({ id }).update(changes);

        if (count) {
            res.json({ message: "Activity updated" });
        } else {
            res.status(404).json({ error: "Activity not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update activity" });
    }
};

// Delete an activity by ID
export const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const count = await db("activities").where({ id }).del();

        if (count) {
            res.json({ message: "Activity deleted" });
        } else {
            res.status(404).json({ error: "Activity not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete activity" });
    }
};
