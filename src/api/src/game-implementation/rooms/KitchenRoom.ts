import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { Room } from "../../game-base/gameObjects/Room";

export class KitchenRoom extends Room {
    public static readonly Alias: string = "KitchenRoom";
    public constructor() {
        super(KitchenRoom.Alias);
    }

    public name(): string {
        return "Kitchen";
    }

    public actions(): SyncOrAsync<Action[]> {
        return [
            new ExamineAction(),
        ];
    }

    public images(): string[] {
        return [""];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult (["working"]);
    }
}
