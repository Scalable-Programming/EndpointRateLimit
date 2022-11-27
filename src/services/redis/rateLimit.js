import { client } from ".";
import { config } from "../../config";

export const incrementUserRates = async (key) => client.INCR(key);

export const setExpireTime = async (
    key,
    expTime = config.rateLimitTime * 1000,
) => client.pExpire(key, expTime);
