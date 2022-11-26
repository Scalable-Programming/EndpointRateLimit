import Express from "express";
import { authenticate } from "./auth";
import { handleError } from "./errorHandler";
import { rateLimitRouter } from "./routes/rateLimiter";
import { userRouter } from "./routes/users";

const server = Express();

server.use(Express.json());
server.use(userRouter);

server.use(authenticate);
server.use(rateLimitRouter);
server.use(handleError);

server.listen(3000, () => {
    console.log("Successfully listening to port 3000");
});
