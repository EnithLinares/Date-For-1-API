import dotenv from "dotenv";

dotenv.config();

const knexConfig = {
    development: {
        client: "mysql2",
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: "./db/migrations",
        },
        seeds: {
            directory: "./db/seeds",
        },
    },
};

export default knexConfig;
