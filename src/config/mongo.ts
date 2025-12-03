// src/config/mongo.ts
import mongoose from "mongoose";
import { env } from "./env";

mongoose.set("strictQuery", true);

(async () => {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("MongoDB connected (Leaderboard Service)");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
})();
