import { Router } from "express";
import { router as gameRouter } from "./game-implementation/routes";
import { router as ChielRouter } from "./Chiel/routes";
import { router as achievementrouter } from "./AchievementMenuRoutes/routes";
// Create a router
export const router: Router = Router();

// Setup endpoints
router.get("/", (_, res) => {
    res.send("Hoi Lennard wij weten dat u ook hier leest!");
});

// Forward endpoints to other routers
router.use("/game", gameRouter);
router.use("/AchievementMenuRoutes", achievementrouter);

router.use("/Chiel", ChielRouter);
