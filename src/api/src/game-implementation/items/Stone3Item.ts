import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { Search } from "../actions/SearchAction";
import { PlayerSession } from "../types";

/**
 * Represents the Lower Left Stone item in the game.
 */
export class LowerLeftStoneItem extends Item implements Examine, Search {
    public static readonly Alias: string = "lowerleftstone";

    public constructor() {
        super(LowerLeftStoneItem.Alias);
    }

    /**
     * Returns the name of the item.
     * @returns {string} The name of the item.
     */
    public name(): string {
        return "Upper right Stone";
    }

    /**
     * Examines the item.
     * @returns {ActionResult | undefined} The result of the examination.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is a small stone located on the  side of the path, above the first stone."]);
    }

    /**
     * Searches under the item.
     * @returns {ActionResult | undefined} The result of the search.
     */
    public search(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.lookedUnderStone3) {
            return new TextActionResult(["You already looked under this stone and found a rusty key."]);
        }
        else {
            playerSession.lookedUnderStone3 = true;
            return new TextActionResult(["You look under the upper right stone and find a rusty key."]);
        }
    }
}
