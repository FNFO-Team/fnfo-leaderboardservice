// src/leaderboard/dto.ts

/**
 * DTO usado cuando GameService envía un score.
 */
export interface SubmitScoreDTO {
    matchId: string;
    userId: string;
    firebaseUid: string;
    songId: string;
    gameMode: "easy" | "normal" | "hard";
    score: number;
    accuracy: number;
}

/**
 * DTO para consultas del leaderboard.
 */
export interface LeaderboardQueryDTO {
    songId?: string;
    gameMode?: "easy" | "normal" | "hard";
    limit?: number;
}
