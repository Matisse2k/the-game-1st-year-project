import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { Search } from "../actions/SearchAction";

/**
 * Represents the Table item in the game.
 */
export class TableItem extends Item implements Examine, Search {
    public static readonly Alias: string = "table";

    /**
     * Constructs a new TableItem instance.
     */
    public constructor() {
        super(TableItem.Alias);
    }

    /**
     * Returns the name of the item.
     * @returns {string} The name of the item.
     */
    public name(): string {
        return "Table";
    }

    /**
     * Returns the result of examining the item.
     * @returns {ActionResult | undefined} The result of the examination.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a sturdy table."]);
    }

    /**
     * Returns the result of searching the item.
     * @returns {ActionResult | undefined} The result of the search.
     */
    public search(): ActionResult | undefined {
        return new TextActionResult([
            "You search the table thoroughly, but find nothing of interest.",
            "It seems like this table hasn't been used in a while, as it's covered in a thin layer of dust.",
            "There are no hidden compartments or items to be found here.",
        ]);
    }
}
