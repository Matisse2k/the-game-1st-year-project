import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

@Interface
export abstract class Give {
    public abstract give(): ActionResult | undefined;
}

export class GiveAction extends Action {
    public static readonly Alias: string = "give";

    public constructor() {
        super(GiveAction.Alias, true);
    }

    public name(): string {
        return "Give";
    }

    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        const gameObject: GameObject = gameObjects[0];
        if (gameObject.instanceOf(Give)) {
            return gameObject.give();
        }
        return new TextActionResult(["You can't give that"]);
    }
}
