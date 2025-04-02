import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Item } from "../../game-base/gameObjects/Item";
import { SwitchPageActionResult } from "../actionResults/SwitchPageActionResult";
import { Open } from "../actions/OpenAction";

export class NotebookItem extends Item implements Open {
    public static readonly Alias: string = "notebook";

    public constructor() {
        super(NotebookItem.Alias);
    }

    public Open(): ActionResult | undefined {
        return new SwitchPageActionResult("notebook");
    }

    public name(): string {
        return "Notebook";
    }
}
