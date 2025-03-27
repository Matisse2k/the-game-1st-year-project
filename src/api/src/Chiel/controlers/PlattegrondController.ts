import { Request, Response } from "express";
// import { PlayerSession } from "../../game-implementation/types";
import { gameService } from "../../global";

export class PlattegrondController {
    public handlePlaatje(_: Request, res: Response): void {
        // const playersession: PlayerSession = gameService.getPlayerSession();

        if (gameService.getPlayerSession().BovenOfBeneden) {
            res.json({
                plaatje: true,
            });
        }
        else {
            res.json({
                plaatje: false,
            });
        }
    }
}
