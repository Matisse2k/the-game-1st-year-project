import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { Search } from "../actions/SearchAction";

/**
 * Represents the Stone 1 item in the game.
 */
export class Stone1Item extends Item implements Examine, Search {
    public static readonly Alias: string = "stone1";

    public constructor() {
        super(Stone1Item.Alias);
    }

    /**
     * Returns the name of the item.
     * @returns {string} The name of the item.
     */
    public name(): string {
        return "Stone 1";
    }

    /**
     * Examines the item.
     * @returns {ActionResult | undefined} The result of the examination.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is a small stone. It looks like it has been here for a long time."]);
    }

    /**
     * Searches under the item.
     * @returns {ActionResult | undefined} The result of the search.
     */
    public search(): ActionResult | undefined {
        if (gameService.getPlayerSession().lookedUnderStone1) {
            return new TextActionResult(["You already looked under this stone."]);
        }
        else {
            gameService.getPlayerSession().lookedUnderStone1 = true;
            return new TextActionResult(["You look under stone 1 and find nothing."]);
            // test
        }
    }
}
