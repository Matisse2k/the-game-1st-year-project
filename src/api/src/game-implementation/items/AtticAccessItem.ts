import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { HatchOpenerItem } from "./HatchOpenerItem";
import { Open } from "../actions/OpenAction";
import { PlayerSession } from "../types";

export class AtticAccessItem extends Item implements Examine, Open {
    public static readonly Alias: string = "AtticAccessItem";

    public constructor() {
        super(AtticAccessItem.Alias);
    }

    public name(): string {
        return "Hatch";
    }

    public examine(): ActionResult | undefined {
        const PlayerSession: PlayerSession = gameService.getPlayerSession();
        if (PlayerSession.inventory.includes(HatchOpenerItem.Alias)) {
            return new TextActionResult(["Maybe the Mysterious object can be used to open the hatch."]);
        }
        return new TextActionResult(["I need an object to open the hatch, I just don't know what"]);
    }

    public Open(): ActionResult | undefined {
        if (gameService.getPlayerSession().inventory.includes(HatchOpenerItem.Alias)) {
            if (gameService.getPlayerSession().HatchOpened === true) {
                return new TextActionResult(["The hatch is already open"]);
            }
            gameService.getPlayerSession().HatchOpened = true;
            return new TextActionResult(["Hatch opened but it gives a ominous feeling."]);
        }
        return new TextActionResult(["I don't have the item to open it"]);
    }
}
