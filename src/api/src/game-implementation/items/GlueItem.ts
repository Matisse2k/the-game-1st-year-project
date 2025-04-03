import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { PickUp } from "../actions/PickUpActions";
import { PlayerSession } from "../types";
import { HatchOpenerItem } from "./HatchOpenerItem";

export class GlueItem extends Item implements Examine, PickUp {
    public static readonly Alias: string = "glue";

    public constructor() {
        super(GlueItem.Alias);
    }

    public pickUp(): string | undefined {
        const PlayerSession: PlayerSession = gameService.getPlayerSession();
        PlayerSession.pickedupGlue = true;

        if (PlayerSession.inventory.includes("Mysterious Hook") && PlayerSession.inventory.includes("Mysterious stick")) {
            PlayerSession.inventory = PlayerSession.inventory.filter(item => item !== "Mysterious Hook");
            PlayerSession.inventory = PlayerSession.inventory.filter(item => item !== "Mysterious stick");
            return HatchOpenerItem.Alias;
        }

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
