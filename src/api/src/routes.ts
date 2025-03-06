import { Router } from "express";
import { router as gameRouter } from "./game-implementation/routes";

// Create a router
export const router: Router = Router();

// Setup endpoints
router.get("/", (_, res) => {
    res.send("Hoi Lennard wij weten dat u ook hier leest!");
});

// Forward endpoints to other routers
router.use("/game", gameRouter);
