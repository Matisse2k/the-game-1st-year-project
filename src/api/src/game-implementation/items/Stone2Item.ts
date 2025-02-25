import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { Search } from "../actions/SearchAction";
import { gameService } from "../../global";

/**
 * Represents the Stone 2 item in the game.
 */
export class Stone2Item extends Item implements Examine, Search {
    public static readonly Alias: string = "stone2";

    public constructor() {
        super(Stone2Item.Alias);
    }

    /**
     * Returns the name of the item.
     * @returns {string} The name of the item.
     */
    public name(): string {
        return "Stone 2";
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
        if (gameService.getPlayerSession().lookedUnderStone2) {
            return new TextActionResult(["You already looked under this stone."]);
        }
        else {
            gameService.getPlayerSession().lookedUnderStone2 = true;
            return new TextActionResult(["You look under stone 2 and find nothing."]);
            // test
        }
    }
}
