// src/config/env.ts
import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT ? Number(process.env.PORT) : 8082,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/fnfo_leaderboard",
};
