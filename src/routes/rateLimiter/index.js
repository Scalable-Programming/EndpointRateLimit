import { Router } from "express";
import {
    getCurrentUserRates,
    incrementUserRates,
    insertFirstUserRate,
} from "./../../services/redis/rateLimit";

const router = Router();

router.get("/rate-limit", async (req, res) => {
    const { username, rateLimit } = req.user;

    const rate = await getCurrentUserRates(username);

    if (!rate) {
        await insertFirstUserRate(username);
        return res.json({ success: true });
    }

    const hasValidRate = rateLimit >= rate + 1;

    if (!hasValidRate) {
        return res.json({ success: false });
    }

    await incrementUserRates(username);
    res.json({ success: true });
});

export { router as rateLimitRouter };
