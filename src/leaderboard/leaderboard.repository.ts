// src/leaderboard/leaderboard.repository.ts
import { LeaderboardModel, ILeaderboardEntry } from "./leaderboard.model";

export class LeaderboardRepository {
    async insert(entry: Partial<ILeaderboardEntry>): Promise<ILeaderboardEntry> {
        const doc = new LeaderboardModel(entry);
        return await doc.save();
    }

    async getTopBySongAndMode(
        songId: string,
        gameMode: string,
        limit: number
    ): Promise<ILeaderboardEntry[]> {
        return LeaderboardModel
            .find({ songId, gameMode })
            .sort({ score: -1 })
            .limit(limit)
            .exec();
    }

    async getBestScoreForUser(
        userId: string,
        songId: string,
        gameMode: string
    ): Promise<ILeaderboardEntry | null> {
        return LeaderboardModel
            .findOne({ userId, songId, gameMode })
            .sort({ score: -1 })
            .exec();
    }

    async updateIfBetterScore(
    userId: string,
    firebaseUid: string,
    songId: string,
    gameMode: string,
    newScore: number,
    newAccuracy: number,
    timestamp: number
    ): Promise<ILeaderboardEntry> {

        const existing = await this.getBestScoreForUser(userId, songId, gameMode);

        // Si no existe → insertar nuevo
        if (!existing) {
            return this.insert({
                userId,
                firebaseUid,
                songId,
                gameMode,
                score: newScore,
                accuracy: newAccuracy,
                timestamp
            } as Partial<ILeaderboardEntry>);
        }

        // Si existe pero es peor -> devolver existente
        if (newScore <= existing.score) {
            return existing;
        }

        // Si es mejor -> actualizar existente
        existing.score = newScore;
        existing.accuracy = newAccuracy;
        existing.timestamp = timestamp;
        existing.firebaseUid = firebaseUid;

        return await existing.save();
    }

}
