import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const config = {
    mongoUrl: process.env.MONGO_URL,
    mongoDb: process.env.MONGO_DB,
    jwtSecret: process.env.JWT_SECRET,
    redisPw: process.env.REDIS_PW,
    rateLimitTime: process.env.RATE_LIMIT_TIME,
};
