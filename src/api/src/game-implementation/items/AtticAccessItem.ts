import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";

export class AtticAccessItem extends Item implements Examine {
    public static readonly Alias: string = "AtticAccessItem";

    public constructor() {
        super(AtticAccessItem.Alias);
    }

    public name(): string {
        return "Attic Access";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["I need an object to open the hatch, I just don't know what"]);
    }
}
