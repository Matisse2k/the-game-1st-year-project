import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { PickUp } from "../actions/PickUpActions";

export class MysteriousStickItem extends Item implements Examine, PickUp {
    public static readonly Alias: string = "MysteriousStick";

    public constructor() {
        super(MysteriousStickItem.Alias);
    }

    public name(): string {
        return "Mysterious Stick";
    }

    public examine(): ActionResult {
        return new TextActionResult([
            "You found a mysterious stick. It seems ordinary, but there's something oddly intriguing about it.",
            "You have a feeling that this stick might be useful later. You should pick it up and add it to your inventory.",
        ]);
    }

    public pickUp(): string | undefined {
        return MysteriousStickItem.Alias;
    }

    public getDescription(): string {
        return "A mysterious stick that seems ordinary, but there's something oddly intriguing about it.";
    }
}
