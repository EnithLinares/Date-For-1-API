import dotenv from "dotenv";
import express from "express";
import knex from "knex";
import knexConfig from "./knexfile.js";

dotenv.config();

const app = express();
const db = knex(knexConfig.development);

const port = process.env.PORT || 8080;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
