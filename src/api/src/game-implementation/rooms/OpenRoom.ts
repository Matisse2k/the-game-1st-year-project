import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Room } from "../../game-base/gameObjects/Room";

export class Openkamer extends Room {
    public static readonly Alias: string = "openkamer";

    public constructor() {
        super(Openkamer.Alias);
    }

    public name(): string {
        return "Openkamer";
    }

    public images(): string[] {
        return ["lobby"];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "What a big open room!",
        ]);
    }
}
