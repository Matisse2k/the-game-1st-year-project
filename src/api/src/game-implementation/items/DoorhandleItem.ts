import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";

export class DoorHandleItem extends Item implements Examine {
    public static readonly Alias: string = " doorhandle";

    public constructor() {
        super(DoorHandleItem.Alias);
    }

    public name(): string {
        return "Doorhandle";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Ah, an doorhandle... This might come in handy later. Better take it with me."]);
    }
}
