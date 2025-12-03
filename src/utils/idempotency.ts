// src/utils/idempotency.ts
import { now } from "./time";

/**
 * Estructura interna simple para almacenar claves procesadas.
 * Más adelante puede sustituirse por Redis o Mongo.
 */
const processedKeys = new Map<string, number>();

/**
 * Construye la clave única para validar idempotencia.
 */
export function makeKey(matchId: string, userId: string): string {
    return `${matchId}:${userId}`;
}

/**
 * Verifica si la clave ya fue procesada.
 */
export function isProcessed(key: string): boolean {
    return processedKeys.has(key);
}

/**
 * Marca la clave como procesada y guarda un timestamp.
 */
export function markProcessed(key: string): void {
    processedKeys.set(key, now());
}

/**
 * Limpieza opcional (no estrictamente necesaria).
 */
export function clearOldKeys(maxAgeMs: number = 5 * 60 * 1000) {
    const nowTs = now();
    for (const [key, timestamp] of processedKeys) {
        if (nowTs - timestamp > maxAgeMs) {
            processedKeys.delete(key);
        }
    }
}
