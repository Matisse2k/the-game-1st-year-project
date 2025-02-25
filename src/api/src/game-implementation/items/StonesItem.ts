import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";

/**
 * StonesItem class represents a collection of stones in the game.
 * This class implements the Examine interface to provide an examination action.
 */
export class StonesItem extends Item implements Examine {
    public static readonly Alias: string = "stones";

    /**
     * Constructor for the StonesItem class.
     */
    public constructor() {
        super(StonesItem.Alias);
    }

    /**
     * Returns the name of the item.
     * @returns {string} The name of the item.
     */
    public name(): string {
        return "Stones";
    }

    /**
     * Examines the stones and returns a description.
     * @returns {ActionResult | undefined} The result of the examination.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You examine the stones scattered across the forest floor. They are arranged in a peculiar pattern, as if placed there intentionally long ago.",
        ]);
    }
}
