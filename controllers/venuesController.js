import db from "../db/knexConfig.js";

// Get all venues
export const getAllVenues = async (req, res) => {
    try {
        const venues = await db("venues").select("*");
        res.json(venues);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch venues" });
    }
};

// Create a new venue
export const createVenue = async (req, res) => {
    try {
        const newVenue = req.body;
        const [id] = await db("venues").insert(newVenue);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: "Failed to create venue" });
    }
};

// Get a specific venue by ID
export const getVenueById = async (req, res) => {
    try {
        const { id } = req.params;
        const venue = await db("venues").where({ id }).first();
        if (venue) {
            res.json(venue);
        } else {
            res.status(404).json({ error: "Venue not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch venue" });
    }
};

// Update a venue by ID
export const updateVenue = async (req, res) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const count = await db("venues").where({ id }).update(changes);
        if (count) {
            res.json({ message: "Venue updated" });
        } else {
            res.status(404).json({ error: "Venue not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update venue" });
    }
};

// Delete a venue by ID
export const deleteVenue = async (req, res) => {
    try {
        const { id } = req.params;
        const count = await db("venues").where({ id }).del();
        if (count) {
            res.json({ message: "Venue deleted" });
        } else {
            res.status(404).json({ error: "Venue not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete venue" });
    }
};
