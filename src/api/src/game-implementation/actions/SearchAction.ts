import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

@Interface
export abstract class Search {
    public abstract search(): ActionResult | undefined;
}

export class SearchAction extends Action {
    public static readonly Alias: string = "search";

    public constructor() {
        super(SearchAction.Alias, true);
    }

    public name(): string {
        return "Search";
    }

    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        const gameObject: GameObject = gameObjects[0];
        if (gameObject.instanceOf(Search)) {
            return gameObject.search();
        }
        return undefined;
    }
}
