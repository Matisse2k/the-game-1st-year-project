import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { PickUp } from "../actions/PickUpActions";
import { PlayerSession } from "../types";

export class TeddyBearItem extends Item implements Examine, PickUp {
    public static readonly Alias: string = "teddy bear";

    public constructor() {
        super(TeddyBearItem.Alias);
    }

    public name(): string {
        return "Teddy Bear";
    }

    public pickUp(): string | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.TeddyBearFound) {
            playerSession.pickedupTeddyBear = true;
            return TeddyBearItem.Alias;
        }
        return undefined;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "It's a cute teddy bear, with a red bowtie and a friendly smile.",
        ]);
    }

    public getDescription(): string {
        return "A cute teddy bear, with a red bowtie and a friendly smile.";
    }
}
