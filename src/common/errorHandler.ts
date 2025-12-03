// src/common/errorHandler.ts
import { Request, Response, NextFunction } from "express";

export function errorHandler(
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    const status = err.status || 500;

    console.error("Leaderboard Service Error:", {
        message: err.message,
        stack: err.stack,
        status,
    });

    res.status(status).json({
        error: true,
        message: err.message || "Internal Server Error",
    });
}
