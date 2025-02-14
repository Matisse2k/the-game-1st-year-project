import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";

export class KnuffelbeerItem extends Item implements Examine {
    public static readonly Alias: string = "knuffelbeer";

    public constructor() {
        super(KnuffelbeerItem.Alias);
    }

    public name(): string {
        return "Knuffelbeer";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["What is a teddy bear doing here?"]);
    }
}
