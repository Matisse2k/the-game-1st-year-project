import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { PickUp } from "../actions/PickUpActions";
import { PlayerSession } from "../types";
import { HatchOpenerItem } from "./HatchOpenerItem";

export class MysteriousHookItem extends Item implements Examine, PickUp {
    public static readonly Alias: string = "Mysterious Hook";

    public constructor() {
        super(MysteriousHookItem.Alias);
    }

    public pickUp(): string | undefined {
        const PlayerSession: PlayerSession = gameService.getPlayerSession();
        // Retourneer de alias van het item
        if (gameService.getPlayerSession().inventory.includes("Mysterious Hook")) {
            return undefined;
        }

        else if (PlayerSession.inventory.includes("Mysterious stick") && PlayerSession.inventory.includes("glue")) {
            PlayerSession.inventory = PlayerSession.inventory.filter(item => item !== "Mysterious stick");
            PlayerSession.inventory = PlayerSession.inventory.filter(item => item !== "glue");
            return HatchOpenerItem.Alias;
        }

        return MysteriousHookItem.Alias;
    }

    public name(): string {
        return "Mysterious Hook";
    }

    public examine(): ActionResult {
        return new TextActionResult([
            "The hook hangs silently on the wall, oddly out of place. It looks like it could be taken.",
        ]);
    }

    public getDescription(): string {
        return "A sturdy metal hook. Looks like it could attach to something...";
    }
}
