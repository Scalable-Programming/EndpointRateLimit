import { Router } from "express";
import { signJwt } from "../../auth";
import { insertUser, verifyUser } from "../../controllers/users";

const router = Router();

router.post("/login", async (req, res, next) => {
    const { password, username } = req.body;

    try {
        const user = await verifyUser(username, password);
        const token = signJwt(user.username);

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
});

router.post("/register", async (req, res, next) => {
    const { password, username, rateLimit } = req.body;

    try {
        const user = await insertUser(username, password, rateLimit);
        const token = signJwt(user.username);

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
});

export { router as userRouter };
