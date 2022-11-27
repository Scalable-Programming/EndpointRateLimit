import { Router } from "express";
import { validateRateLimit } from "./../../controllers/rateLimiter/index";

const router = Router();

router.get("/rate-limit", async (req, res, next) => {
    const { username, rateLimit } = req.user;

    try {
        await validateRateLimit(rateLimit, username);
        res.json({ success: true });
    } catch (error) {
        next(error);
    }
});

export { router as rateLimitRouter };
