import { sign, verify } from "jsonwebtoken";
import { config } from "../config";
import { MissingJWTError, InvalidJWTError } from "../errors";
import { MongoUsersProvider } from "./../dataProvider/users/index";

export const signJwt = (username) =>
    sign({ username }, config.jwtSecret, { expiresIn: 24 * 60 * 60 });

export const verifyJwt = (jwt) => {
    try {
        const decoded = verify(jwt, config.jwtSecret);

        return decoded.username;
    } catch (error) {
        throw new InvalidJWTError();
    }
};

export const authenticate = async (req, res, next) => {
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
            const username = verifyJwt(req.headers.authorization.split(" ")[1]);
            const user = await MongoUsersProvider.getUser(username);

            req.user = user;
            next();
        } else {
            throw new MissingJWTError();
        }
    } catch (error) {
        next(error);
    }
};
