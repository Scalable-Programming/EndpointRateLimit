import {
    InvalidJWTError,
    RateLimitExceededError,
    UserNotFoundError,
    WrongUserCredentialsError,
} from "../errors";
import { MissingJWTError } from "./../errors";

export const handleError = (error, req, res, next) => {
    let errorResponse = {
        message: error.message ?? "Unknown internal error",
        name: error.name ?? "InternalError",
    };

    let statusCode = 500;

    switch (error.constructor) {
        case (UserNotFoundError, WrongUserCredentialsError): {
            statusCode = 404;
            break;
        }
        case InvalidJWTError:
            statusCode = 403;
            break;
        case MissingJWTError:
            statusCode = 401;
            break;
        case RateLimitExceededError:
            statusCode = 429;
            break;
        default:
            break;
    }

    res.status(statusCode).json({ error: errorResponse });
};
