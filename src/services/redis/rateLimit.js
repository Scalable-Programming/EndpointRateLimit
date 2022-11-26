import { client } from ".";

export const getCurrentUserRates = async (username) => {
    const value = await client.get(username);

    return value ? +value : null;
};

export const insertFirstUserRate = async (username) =>
    client.set(username, "1", { EX: 10 });

export const incrementUserRates = async (username) => client.INCR(username);
