import { RateLimitExceededError } from "../../errors";
import {
    incrementUserRates,
    setExpireTime,
} from "./../../services/redis/rateLimit";

export const validateRateLimit = async (rateLimit, username) => {
    const rate = await incrementUserRates(username);

    if (rate === 1) {
        await setExpireTime(username);
    }

    if (rate > rateLimit) {
        throw new RateLimitExceededError();
    }
};
