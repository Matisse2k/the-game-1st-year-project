import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Item } from "../../game-base/gameObjects/Item";
import { PickUp } from "../actions/PickUpActions";
import { gameService } from "../../global";

export class WoodenStickitem extends Item implements PickUp {
    public static readonly Alias: string = "Wooden Stick";

    public constructor() {
        super(WoodenStickitem.Alias);
    }

    public name(): SyncOrAsync<string> {
        return "Wooden Stick";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Why is this wooden stick just laying around here?"]);
    }

    public pickUp(): string | undefined {
        if (gameService.getPlayerSession().inventory.includes("Wooden Stick")) {
            return undefined;
        }
        return WoodenStickitem.Alias;
    }
}
