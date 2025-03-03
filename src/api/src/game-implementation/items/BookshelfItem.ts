import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { PlayerSession } from "../types";

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
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.inventory.includes("MysteriousStick")) {
            return new TextActionResult([
                "It's a bookshelf filled with books.",
                "You have already found the mysterious stick hidden behind the books.",
            ]);
        }
        else {
            playerSession.MysteriousStickRevealed = true;
            return new TextActionResult([
                "It's a bookshelf filled with books.",
                "As you examine the books, you notice a mysterious stick hidden behind them.",
            ]);
        }
    }
}
