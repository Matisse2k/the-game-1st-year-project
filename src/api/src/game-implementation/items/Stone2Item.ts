import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { Search } from "../actions/SearchAction";
import { gameService } from "../../global";

/**
 * Represents the Upper Right Stone item in the game.
 */
export class UpperRightStoneItem extends Item implements Examine, Search {
    public static readonly Alias: string = "upperrightstone";

    public constructor() {
        super(UpperRightStoneItem.Alias);
    }

    /**
     * Returns the name of the item.
     * @returns {string} The name of the item.
     */
    public name(): string {
        return "Lower left Stone";
    }

    /**
     * Examines the item.
     * @returns {ActionResult | undefined} The result of the examination.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([" This is a small stone located on the left side of the path, closest to where you're standing."]);
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
            return new TextActionResult(["You look under the lower left stone and find nothing."]);
        }
    }
}
