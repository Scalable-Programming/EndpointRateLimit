import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync();

export const getHashedValue = (value) => bcrypt.hashSync(value, salt);

export const isValidHash = (value, encrypted) =>
    bcrypt.compareSync(value, encrypted);
