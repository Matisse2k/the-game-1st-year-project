import { Router } from "express";
import { PlattegrondController } from "./controlers/PlattegrondController";
import { gameService } from "../global";

// Create a router
export const router: Router = Router();

router.get("/", (_, res) => {
    res.send("Hoi Welkom in de Dummie API! Haveeeee fun!!!");
});

const plattegrondController: PlattegrondController = new PlattegrondController();

// NOTE: All endpoints after this line require a player session!
router.use(gameService.createPlayerSessionMiddleware());

router.get("/check-plaatje", (req, res) => plattegrondController.handlePlaatje(req, res));
