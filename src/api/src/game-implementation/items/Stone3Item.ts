import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { Search } from "../actions/SearchAction";
import { PlayerSession } from "../types";
import { KeyItem } from "./KeyItem";

/**
 * Represents the Stone 3 item in the game.
 */
export class Stone3Item extends Item implements Examine, Search {
    public static readonly Alias: string = "stone3";

    public constructor() {
        super(Stone3Item.Alias);
    }

    /**
     * Returns the name of the item.
     * @returns {string} The name of the item.
     */
    public name(): string {
        return "Stone 3";
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
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.lookedUnderStone3) {
            return new TextActionResult(["You already looked under this stone and found a rusty key."]);
        }
        else {
            playerSession.lookedUnderStone3 = true;
            playerSession.keyFound = true; // Set the keyFound flag to true
            playerSession.inventory.push(KeyItem.Alias); // Add the key to the player's inventory
            return new TextActionResult(["You look under stone 3 and find a rusty key."]);
        }
    }
}
