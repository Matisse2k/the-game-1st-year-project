import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { Search } from "../actions/SearchAction";

/**
 * Represents the Upper Left Stone item in the game.
 */
export class UpperLeftStoneItem extends Item implements Examine, Search {
    public static readonly Alias: string = "upperleftstone";

    public constructor() {
        super(UpperLeftStoneItem.Alias);
    }

    /**
     * Returns the name of the item.
     * @returns {string} The name of the item.
     */
    public name(): string {
        return "Upper Left Stone";
    }

    /**
     * Examines the item.
     * @returns {ActionResult | undefined} The result of the examination.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is a small stone located on the left side of the path, above the stone closest to you."]);
    }

    /**
     * Searches under the item.
     * @returns {ActionResult | undefined} The result of the search.
     */
    public search(): ActionResult | undefined {
        if (gameService.getPlayerSession().lookedUnderStone4) {
            return new TextActionResult(["You already looked under this stone."]);
        }
        else {
            gameService.getPlayerSession().lookedUnderStone4 = true;
            return new TextActionResult(["You look under the upper left stone and find nothing."]);
        }
    }
}
