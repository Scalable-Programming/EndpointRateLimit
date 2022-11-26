export class UserNotFoundError extends Error {
    constructor() {
        super();
        this.message = "No user found with this credentials";
        this.name = "UserNotFoundError";
    }
}

export class WrongUserCredentialsError extends Error {
    constructor() {
        super();
        this.message = "Invalid credentials provided";
        this.name = "WrongUserCredentialsError";
    }
}

export class MissingJWTError extends Error {
    constructor() {
        super();
        this.message = "Provide token in order to access endpoint";
        this.name = "MissingJWTError";
    }
}

export class InvalidJWTError extends Error {
    constructor() {
        super();
        this.name = "InvalidJWTError";
        this.message = "Token is not valid";
    }
}

export class UsernameAlreadyTakenError extends Error {
    constructor() {
        super();
        this.name = "UsernameAlreadyTakenError";
        this.message = "Please provide new username. This one is already taken";
    }
}
