import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { Search } from "../actions/SearchAction";

export class CabinetItem extends Item implements Examine, Search {
    public static readonly Alias: string = "cabinet";

    public constructor() {
        super(CabinetItem.Alias);
    }

    public name(): string {
        return "Cabinet";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a sturdy cabinet."]);
    }

    public search(): ActionResult | undefined {
        return new TextActionResult([
            "You open the cabinet doors and peer inside.",
            "It's empty, except for a thick layer of dust and a few cobwebs.",
            "It seems like no one has used this cabinet in a long time.",
        ]);
    }
}
