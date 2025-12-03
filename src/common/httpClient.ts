// src/common/httpClient.ts
import axios from "axios";

export const httpClient = axios.create({
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Optional: logging para debug
httpClient.interceptors.request.use((config) => {
    console.log(`HTTP Request → ${config.method?.toUpperCase()} ${config.url}`);
    return config;
});

httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("HTTP Error:", {
            url: error.config?.url,
            method: error.config?.method,
            message: error.message,
        });
        return Promise.reject(error);
    }
);
