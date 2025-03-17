import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { PickUp } from "../actions/PickUpActions";
import { gameService } from "../../global";

export class ServeerplaatItem extends Item implements Examine, PickUp {
    public static readonly Alias: string = "Serving platter";

    public constructor() {
        super(ServeerplaatItem.Alias);
    }

    public name(): string {
        return "Serving platter";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["What is this serving platter doing on the floor ??"]);
    }

    public pickUp(): string | undefined {
        // Retourneer de alias van het item
        if (gameService.getPlayerSession().inventory.includes("Serving platter")) {
            return undefined;
        }
        console.log("zit in inventory");
        return ServeerplaatItem.Alias;
    }

    public getDescription(): string {
        return "A serving platter that seems to be out of place.";
    }
}
