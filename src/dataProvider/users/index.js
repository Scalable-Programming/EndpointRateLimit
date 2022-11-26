import { userCollection } from "..";
import { UserNotFoundError, WrongUserCredentialsError } from "../../errors";
import { getHashedValue, isValidHash } from "../../services/hash";

const getUser = async (username) => {
    const user = await userCollection.findOne({ username });

    if (!user) {
        throw new UserNotFoundError();
    }

    return user;
};

const verifyUser = async (username, password) => {
    const user = await getUser(username);
    const isValidPassword = await isValidHash(password, user.password);

    if (!isValidPassword) {
        throw new WrongUserCredentialsError();
    }

    return user;
};

const insertUser = async (username, password, rateLimit) => {
    const hashedPassword = await getHashedValue(password);
    await userCollection.insertOne({
        username,
        password: hashedPassword,
        rateLimit,
    });
};

export const MongoUsersProvider = {
    getUser,
    insertUser,
    verifyUser,
};
