import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync();

export const getHashedValue = async (value) => bcrypt.hash(value, salt);

export const isValidHash = async (value, encrypted) =>
    bcrypt.compare(value, encrypted);
