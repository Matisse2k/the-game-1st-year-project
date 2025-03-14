import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

@Interface
export abstract class Inspect {
    public abstract Inspect(): ActionResult | undefined;
}

export class InspectAction extends Action {
    public static readonly Alias: string = "InspectAction";

    public constructor() {
        super(InspectAction.Alias, true);
    }

    public name(): string {
        return "Inspect";
    }

    /**
 * Executes the inspection action on a game object.
 * Checks if the game object supports the `Inspect` function and executes it.
 * If inspection is not possible, it returns an error message.
 *
 * @param _alias - An alias (currently unused in the function).
 * @param gameObjects - An array of game objects, where the first object is inspected.
 * @returns {ActionResult | undefined} - The result of the inspection or an error message if inspection is not possible.
 */
    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        // Retrieves the first game object from the list.
        const GameObject: GameObject = gameObjects[0];

        // Checks if the game object supports the 'Inspect' function.
        if (GameObject.instanceOf(Inspect)) {
            return GameObject.Inspect();
        }
        // Returns the following message if inspection is not possible.
        else return new TextActionResult (["Hey! I'm not an item to be inspected—rude!"]);
    }
}
