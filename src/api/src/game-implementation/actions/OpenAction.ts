import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";

@Interface
export abstract class Open {
    /**
     * Executes the use action on the game object.
     * @returns {ActionResult | undefined} The result of the use action.
     */
    public abstract Open(): ActionResult | undefined;
}
export class OpenAction extends Action {
    public static readonly Alias: string = "Open";

    public constructor() {
        super(OpenAction.Alias, true);
    }

    public name(): string {
        return "Open";
    }

    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        const gameObject: GameObject = gameObjects[0];
        if (gameObject.instanceOf(Open)) {
            return gameObject.Open();
        }
        return new TextActionResult(["I can't open that"]);
    }
}
