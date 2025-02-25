import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

/**
 * Represents the search interface that game objects can implement.
 */
@Interface
export abstract class Search {
    /**
     * Executes the search action on the game object.
     * @returns {ActionResult | undefined} The result of the search action.
     */
    public abstract search(): ActionResult | undefined;
}

/**
 * Represents the action of searching a game object.
 */
export class SearchAction extends Action {
    public static readonly Alias: string = "search";

    /**
     * Constructs a new SearchAction instance.
     */
    public constructor() {
        super(SearchAction.Alias, true);
    }

    /**
     * Returns the name of the action.
     * @returns {string} The name of the action.
     */
    public name(): string {
        return "Search";
    }

    /**
     * Executes the search action on the specified game objects.
     * @param _alias The alias of the action.
     * @param gameObjects The game objects involved in the action.
     * @returns {ActionResult | undefined} The result of the action.
     */
    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        const gameObject: GameObject = gameObjects[0];
        if (gameObject.instanceOf(Search)) {
            return gameObject.search();
        }
        return undefined;
    }
}
