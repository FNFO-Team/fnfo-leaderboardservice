// src/leaderboard/leaderboard.routes.ts
import { Router } from "express";
import { LeaderboardController } from "./leaderboard.controller";

const router = Router();
const controller = new LeaderboardController();

// POST -> GameService envía score
router.post("/submit", controller.submitScore);

// GET -> Frontend consulta leaderboard
router.get("/", controller.getLeaderboard);

export default router;
