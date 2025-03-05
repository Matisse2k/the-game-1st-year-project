import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { PickUp } from "../actions/PickUpActions";
import { PlayerSession } from "../types";

export class GlueItem extends Item implements Examine, PickUp {
    public static readonly Alias: string = "glue";

    public constructor() {
        super(GlueItem.Alias);
    }

    public pickUp(): string | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.pickedupGlue = true;

        return GlueItem.Alias;
    }

    public name(): string {
        return "Glue";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Ah, a pot of glue… This might come in handy later. Better take it with me."]);
    }

    public getDescription(): string {
        return "A sticky pot of glue, useful for sticking things together.";
    }
}
