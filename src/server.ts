// src/server.ts
import { createServer } from "http";
import app from "./app";
import { env } from "./config/env";
import "./config/mongo"; // Inicializa la conexión a MongoDB

const PORT = env.PORT;

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
    console.log(`Leaderboard Service running on port ${PORT}`);
});
