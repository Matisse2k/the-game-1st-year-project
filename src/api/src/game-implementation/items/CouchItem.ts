import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { Search } from "../actions/SearchAction";
import { PlayerSession } from "../types";

export class CouchItem extends Item implements Examine, Search {
    public static readonly Alias: string = "couch";

    public constructor() {
        super(CouchItem.Alias);
    }

    public name(): string {
        return "Couch";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a comfy couch."]);
    }

    public search(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.TeddyBearFound) {
            return new TextActionResult([
                "You look under the couch again, but there's nothing there except some dust and cobwebs.",
                "It seems like you've already found everything of interest here.",
            ]);
        }
        else {
            playerSession.TeddyBearFound = true;
            playerSession.inventory.push("teddy bear");

            return new TextActionResult([
                "You look under the couch and see some spiders scurrying away.",
                "Amidst the dust and cobwebs, you find a teddy bear!",
                "You pick up the teddy bear and add it to your inventory.",
            ]);
        }
    }
}
