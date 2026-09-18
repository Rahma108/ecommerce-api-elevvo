import "dotenv/config";

export const env = {
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
     CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
};