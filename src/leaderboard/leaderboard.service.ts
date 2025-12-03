// src/leaderboard/leaderboard.service.ts
import { SubmitScoreDTO, LeaderboardQueryDTO } from "./dto";
import { LeaderboardRepository } from "./leaderboard.repository";
import { makeKey, isProcessed, markProcessed } from "../utils/idempotency";
import { now } from "../utils/time";

export class LeaderboardService {
    private repository: LeaderboardRepository;

    constructor() {
        this.repository = new LeaderboardRepository();
    }

    /**
     * Procesa un score enviado desde GameService.
     */
    async submitScore(dto: SubmitScoreDTO) {
        const key = makeKey(dto.matchId, dto.userId);

        // IDempotencia -> si ya procesamos este evento, lo ignoramos
        if (isProcessed(key)) {
            return { ignored: true, reason: "duplicate_event" };
        }

        // Marcar como procesado
        markProcessed(key);

        const timestamp = now();

        // Actualiza score si es mejor
        const updatedEntry = await this.repository.updateIfBetterScore(
            dto.userId,
            dto.firebaseUid,
            dto.songId,
            dto.gameMode,
            dto.score,
            dto.accuracy,
            timestamp
        );

        return {
            updated: true,
            entry: updatedEntry,
        };
    }

    /**
     * Obtiene leaderboard filtrado por canción y modo, o global.
     */
    async getLeaderboard(query: LeaderboardQueryDTO) {
        const limit = query.limit ?? 10;

        if (!query.songId || !query.gameMode) {
            // Más adelante se puede hacer leaderboard global
            throw {
                status: 400,
                message: "songId and gameMode are required for leaderboard queries",
            };
        }

        return await this.repository.getTopBySongAndMode(
            query.songId,
            query.gameMode,
            limit
        );
    }
}
