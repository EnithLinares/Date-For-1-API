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

// Search activities query endpoint
export const searchActivities = async (req, res) => {
    try {
        const { query } = req.query;
        const results = await db("activities")
            .distinct(
                "activities.id",
                "activities.name",
                "activities.description",
                "activities.image_url",
                "venues.name as venue_name"
            )
            .select(
                db.raw(
                    "GROUP_CONCAT(DISTINCT times_of_day.name) as times_of_day"
                ),
                db.raw(
                    "GROUP_CONCAT(DISTINCT price_ranges.range) as price_ranges"
                )
            )
            .join("venues", "activities.venue_id", "venues.id")
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
            .where(function () {
                this.where("activities.name", "like", `%${query}%`)
                    .orWhere("activities.description", "like", `%${query}%`)
                    .orWhere("moods.name", "like", `%${query}%`)
                    .orWhere("price_ranges.range", "like", `%${query}%`)
                    .orWhere("venues.name", "like", `%${query}%`)
                    .orWhere("times_of_day.name", "like", `%${query}%`);
            })
            .groupBy(
                "activities.id",
                "activities.name",
                "activities.description",
                "activities.image_url",
                "venues.name"
            );

        res.setHeader("Content-Type", "application/json");
        res.json(results);
    } catch (error) {
        console.error("Error performing search:", error);
        res.status(500).json({ error: "Failed to perform search" });
    }
};

// Create a new activity
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

        // Handle image upload
        const image_url = req.file ? `/uploads/${req.file.filename}` : null;

        // Check if the venue exists; if not, create it
        let venue = await db("venues").where({ name: venue_name }).first();
        if (!venue) {
            [venue] = await db("venues")
                .insert({ name: venue_name })
                .returning("*");
        }

        // Insert the new activity
        const [id] = await db("activities").insert({
            name,
            description,
            venue_id: venue.id,
            image_url,
        });

        // Insert related data into junction tables
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

// Get filtered activities by mood, time of day, price range, or venue
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
                ),
                db.raw("GROUP_CONCAT(DISTINCT moods.name) as moods")
            )
            .join("venues", "activities.venue_id", "venues.id")
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

// Get a specific activity by ID
export const getActivityById = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch activity details along with related venue information
        const activity = await db("activities")
            .select(
                "activities.id",
                "activities.name",
                "activities.description",
                "activities.image_url", // Ensure image_url is included
                "venues.name as venue_name",
                "venues.address as venue_address",
                "venues.website_url as venue_website", // Venue details
                db.raw(
                    "GROUP_CONCAT(DISTINCT times_of_day.name) as times_of_day"
                ),
                db.raw(
                    "GROUP_CONCAT(DISTINCT price_ranges.range) as price_ranges"
                ),
                db.raw("GROUP_CONCAT(DISTINCT moods.name) as moods")
            )
            .leftJoin("venues", "activities.venue_id", "venues.id")
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
            .where("activities.id", id)
            .groupBy(
                "activities.id",
                "venues.name",
                "venues.address",
                "venues.website_url"
            )
            .first();

        if (activity) {
            // If image_url is a relative path, prepend your server's base URL
            if (activity.image_url && !activity.image_url.startsWith("http")) {
                const baseUrl =
                    process.env.SERVER_BASE_URL || "http://localhost:8080";
                activity.image_url = `${baseUrl}${activity.image_url}`;
            }

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
        console.error(error);
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
        console.error(error);
        res.status(500).json({ error: "Failed to delete activity" });
    }
};
