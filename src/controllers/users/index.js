import { MongoUsersProvider } from "../../dataProvider/users";
import { UsernameAlreadyTakenError } from "./../../errors";

export const insertUser = async (username, password, rateLimit) => {
    try {
        await MongoUsersProvider.insertUser(username, password, rateLimit);
        return await MongoUsersProvider.getUser(username);
    } catch (error) {
        if (error?.code === 11000) {
            throw new UsernameAlreadyTakenError();
        }

        throw error;
    }
};

export const getUser = async (username) => MongoUsersProvider.getUser(username);

export const verifyUser = async (username, password) =>
    MongoUsersProvider.verifyUser(username, password);
