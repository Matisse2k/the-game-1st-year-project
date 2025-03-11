import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";

export class StartAreaItem extends Item implements Examine {
    public static readonly Alias: string = "StartArea";
    public constructor() {
        super(StartAreaItem.Alias);
    }

    public name(): string {
        return "StartArea";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult (["A pounding pain throbs in your skull as you awaken on the cold, damp ground.", " The air is thick with the scent of damp earth and decay, and twisted trees loom in the darkness, their branches clawing at the starless sky.", " You don’t know where you are or how you got here, but one thing is certain.", "You need to find out."]);
    }
}
