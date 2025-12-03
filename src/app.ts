// src/app.ts
import express from "express";
import cors from "cors";
import leaderboardRoutes from "./leaderboard/leaderboard.routes";
import { errorHandler } from "./common/errorHandler";

const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", service: "leaderboard-service" });
});

// Rutas principales
app.use("/leaderboard", leaderboardRoutes);

// Error handler global (igual al GameService)
app.use(errorHandler);

export default app;
