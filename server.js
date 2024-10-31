import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import activitiesRoutes from "./routes/activitiesRoutes.js";
import venuesRoutes from "./routes/venuesRoutes.js";
import optionsRoutes from "./routes/optionsRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/activities", activitiesRoutes);
app.use("/api/venues", venuesRoutes);
app.use("/api/options", optionsRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
