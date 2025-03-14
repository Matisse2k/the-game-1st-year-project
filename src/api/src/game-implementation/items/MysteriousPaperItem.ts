import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Item } from "../../game-base/gameObjects/Item";
import { Inspect } from "../actions/InspectAction";

export class MysteriousPaperItem extends Item implements Inspect {
    public static readonly Alias: string = "MysteriousPaper";

    public constructor() {
        super(MysteriousPaperItem.Alias);
    }

    public name(): string {
        return "Mysterious Paper";
    }

    public getDescription(): string {
        return "A mysterious paper, maybe by inspecting it, it will reveal something more.";
    }

    public Inspect(): ActionResult | undefined {
        return new TextActionResult (["Small and soft, a friend so dear", "Lost in a place both far and near", "In the lobby where guests take a seat", " Look below that's where we meet."]);
    }
}
