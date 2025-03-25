import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";

export class GroundFloorMap extends Item implements Examine {
    public static readonly Alias: string = "ground floor map";

    public constructor() {
        super(GroundFloorMap.Alias);
    }

    public name(): string {
        return "ground floor map";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "It's a map of the castle's ground floor.",
        ]);
    }

    public getDescription(): string {
        return "A map of the castle's ground floor.";
    }
}
