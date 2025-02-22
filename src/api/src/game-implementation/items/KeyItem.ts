import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Item } from "../../game-base/gameObjects/Item";

/**
 * KeyItem class represents a key in the game.
 */
export class KeyItem extends Item {
    public static readonly Alias: string = "key";

    /**
     * Constructor for the KeyItem class.
     */
    public constructor() {
        super(KeyItem.Alias);
    }

    /**
     * Returns the name of the item.
     * @returns {string} The name of the item.
     */
    public name(): string {
        return "Key";
    }

    /**
     * Examines the key and returns a description.
     * @returns {ActionResult | undefined} The result of the examination.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This is an old rusty key. It might be useful later.",
        ]);
    }
}
