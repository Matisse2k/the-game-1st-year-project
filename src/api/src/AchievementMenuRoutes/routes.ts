import { Router } from "express";
import { AchievementStatusController } from "./Controllers/AchievementStatusController";
import { gameService } from "../global";

export const router: Router = Router();

router.get("/", (_, res) => {
    res.send("Deze api haalt alle statussen van de achievements");
});

const achievementsController: AchievementStatusController = new AchievementStatusController();

router.use(gameService.createPlayerSessionMiddleware());

router.get("/check-status", (req, res) => achievementsController.checkAllStatuses(req, res));
