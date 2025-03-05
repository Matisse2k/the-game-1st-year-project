import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
// import { gameService } from "../../global";
import { PickUp } from "../actions/PickUpActions";
// import { PlayerSession } from "../types";

export class KnifeItem extends Item implements Examine, PickUp {
    public static readonly Alias: string = "knife";

    public constructor() {
        super(KnifeItem.Alias);
    }

    public pickUp(): string | undefined {
        // const playerSession: PlayerSession = gameService.getPlayerSession();
        // playerSession. = true;

        return KnifeItem.Alias;
    }

    public name(): string {
        return "Knife";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["A sharp knife, the chef must have left it here."]);
    }

    public getDescription(): string {
        return "A sharp knife, the chef must have left it here.";
    }
}
