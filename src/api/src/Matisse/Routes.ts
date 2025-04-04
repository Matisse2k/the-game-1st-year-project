import { Router } from "express";
import { SoundController } from "./SoundController";

const soundController: SoundController = new SoundController();

export const router: Router = Router();

router.get("/", (_, res) => res.send("Hoi Welkom in de Matisse API! Haveeeee fun!!!"));
router.get("/play/:sound", (req, res) => soundController.playSound(req, res));
