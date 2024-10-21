import db from "../db/knexConfig.js";

// Get all activities
export const getAllActivities = async (req, res) => {
    try {
        const activities = await db("activities").select("*");
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch activities" });
    }
};

// Create a new activity
export const createActivity = async (req, res) => {
    try {
        const newActivity = req.body;
        const [id] = await db("activities").insert(newActivity);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: "Failed to create activity" });
    }
};

// Get a specific activity by ID
export const getActivityById = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await db("activities").where({ id }).first();
        if (activity) {
            res.json(activity);
        } else {
            res.status(404).json({ error: "Activity not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch activity" });
    }
};

// Update an activity by ID
export const updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const changes = req.body;
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
