import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { Search } from "../actions/SearchAction";

/**
 * Represents the Lower Right Stone item in the game.
 */
export class LowerRightStoneItem extends Item implements Examine, Search {
    public static readonly Alias: string = "lowerrightstone";

    public constructor() {
        super(LowerRightStoneItem.Alias);
    }

    /**
     * Returns the name of the item.
     * @returns {string} The name of the item.
     */
    public name(): string {
        return "Lower Right Stone";
    }

    /**
     * Examines the item.
     * @returns {ActionResult | undefined} The result of the examination.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is a small stone located on the right side of the path. It's the first one you see when walking along the path."]);
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
            return new TextActionResult(["You look under the lower right stone and find nothing."]);
        }
    }
}
