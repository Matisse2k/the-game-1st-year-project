import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { Search } from "../actions/SearchAction";

/**
 * Represents the Cabinet item in the game.
 */
export class CabinetItem extends Item implements Examine, Search {
    public static readonly Alias: string = "cabinet";

    /**
     * Constructs a new CabinetItem instance.
     */
    public constructor() {
        super(CabinetItem.Alias);
    }

    /**
     * Returns the name of the item.
     * @returns {string} The name of the item.
     */
    public name(): string {
        return "Cabinet";
    }

    /**
     * Returns the result of examining the item.
     * @returns {ActionResult | undefined} The result of the examination.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a sturdy cabinet."]);
    }

    /**
     * Returns the result of searching the item.
     * @returns {ActionResult | undefined} The result of the search.
     */
    public search(): ActionResult | undefined {
        return new TextActionResult([
            "You open the cabinet doors and peer inside.",
            "It's empty, except for a thick layer of dust and a few cobwebs.",
            "It seems like no one has used this cabinet in a long time.",
        ]);
    }
}
