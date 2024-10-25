import db from "../db.js";

export const getVenues = async (req, res) => {
    try {
        const venues = await db("venues").select("*");
        res.json(venues);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch venues" });
    }
};

export const getMoods = async (req, res) => {
    try {
        const moods = await db("moods").select("*");
        res.json(moods);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch moods" });
    }
};

export const getPriceRanges = async (req, res) => {
    try {
        const priceRanges = await db("price_ranges").select("*");
        res.json(priceRanges);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch price ranges" });
    }
};

export const getTimesOfDay = async (req, res) => {
    try {
        const timesOfDay = await db("times_of_day").select("*");
        res.json(timesOfDay);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch times of day" });
    }
};
