// src/leaderboard/leaderboard.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ILeaderboardEntry extends Document {
    userId: string;
    firebaseUid: string;
    songId: string;
    gameMode: "easy" | "normal" | "hard";
    score: number;
    accuracy: number;
    timestamp: number;
}

const LeaderboardSchema = new Schema<ILeaderboardEntry>({
    userId: { type: String, required: true },
    firebaseUid: { type: String, required: true },
    songId: { type: String, required: true },
    gameMode: { type: String, required: true },
    score: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    timestamp: { type: Number, required: true },
});

// Índice compuesto para consultas eficientes
LeaderboardSchema.index({ songId: 1, gameMode: 1, score: -1 });

export const LeaderboardModel = mongoose.model<ILeaderboardEntry>(
    "Leaderboard",
    LeaderboardSchema
);
