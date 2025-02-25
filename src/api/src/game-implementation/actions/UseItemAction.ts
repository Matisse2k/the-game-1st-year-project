import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

/**
 * Represents the use interface that game objects can implement.
 */
@Interface
export abstract class Use {
    /**
     * Executes the use action on the game object.
     * @returns {ActionResult | undefined} The result of the use action.
     */
    public abstract use(): ActionResult | undefined;
}

/**
 * Represents the action of using a game object.
 */
export class UseItemAction extends Action {
    public static readonly Alias: string = "use";

    /**
     * Constructs a new UseItemAction instance.
     */
    public constructor() {
        super(UseItemAction.Alias, true);
    }

    /**
     * Returns the name of the action.
     * @returns {string} The name of the action.
     */
    public name(): string {
        return "Use";
    }

    /**
     * Executes the use action on the specified game objects.
     * @param _alias The alias of the action.
     * @param gameObjects The game objects involved in the action.
     * @returns {ActionResult | undefined} The result of the action.
     */
    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        const gameObject: GameObject = gameObjects[0];
        if (gameObject.instanceOf(Use)) {
            return gameObject.use();
        }
        return new TextActionResult(["You can't use that."]);
    }
}
