import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";

export class TeddyBearItem extends Item implements Examine {
    public static readonly Alias: string = "teddybear";

    public constructor() {
        super(TeddyBearItem.Alias);
    }

    public name(): string {
        return "Teddy Bear";
    }

    public examine(): ActionResult | undefined {
        return undefined;
    }
}
