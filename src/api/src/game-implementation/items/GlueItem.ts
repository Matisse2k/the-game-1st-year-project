import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";

export class GlueItem extends Item implements Examine {
    public static readonly Alias: string = " glue";

    public constructor() {
        super(GlueItem.Alias);
    }

    public name(): string {
        return "Glue";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Ah, a pot of glue… This might come in handy later. Better take it with me."]);
    }
}
