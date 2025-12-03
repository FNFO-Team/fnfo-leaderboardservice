// src/utils/time.ts

/**
 * Retorna el timestamp actual en milisegundos.
 */
export function now(): number {
    return Date.now();
}

/**
 * Retorna la diferencia absoluta entre dos timestamps.
 */
export function diff(a: number, b: number): number {
    return Math.abs(a - b);
}

/**
 * Convierte un timestamp (ms) a ISO string.
 */
export function toISO(timestamp: number): string {
    return new Date(timestamp).toISOString();
}
