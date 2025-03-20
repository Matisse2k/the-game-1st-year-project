import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";

/**
 * Represents the Bookshelf item in the game.
 */
export class BookshelfItem extends Item implements Examine {
    public static readonly Alias: string = "Bookshelf";

    /**
     * Constructs a new BookshelfItem instance.
     */
    public constructor() {
        super(BookshelfItem.Alias);
    }

    /**
     * Returns the name of the item.
     * @returns {string} The name of the item.
     */
    public name(): string {
        return "Bookshelf";
    }

    /**
     * Returns the result of examining the item.
     * @returns {ActionResult | undefined} The result of the examination.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "It's a bookshelf filled with books.",
            "Nothing seems out of the ordinary",
        ]);
    }
}
