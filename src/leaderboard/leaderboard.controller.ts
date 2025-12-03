// src/leaderboard/leaderboard.controller.ts
import { Request, Response, NextFunction } from "express";
import { LeaderboardService } from "./leaderboard.service";

export class LeaderboardController {
    private service: LeaderboardService;

    constructor() {
        this.service = new LeaderboardService();
    }

    submitScore = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = req.body;
            const result = await this.service.submitScore(dto);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };

    getLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.query;
            const result = await this.service.getLeaderboard({
                songId: query.songId as string | undefined,
                gameMode: query.gameMode as any,
                limit: query.limit ? Number(query.limit) : undefined,
            });
            res.json(result);
        } catch (error) {
            next(error);
        }
    };
}
