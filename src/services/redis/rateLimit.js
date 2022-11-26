import { client } from ".";
import { config } from "../../config";

export const getCurrentUserRates = async (username) => {
    const value = await client.get(username);

    return value ? +value : null;
};

export const insertFirstUserRate = async (username) =>
    client.set(username, "1", { EX: config.rateLimitTime });

export const incrementUserRates = async (username) => client.INCR(username);
