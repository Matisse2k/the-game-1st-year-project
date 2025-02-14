import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

@Interface
export abstract class Walk {
    public abstract walk(): ActionResult | undefined;
}

export class WalkAction extends Action {
    public static readonly Alias: string = "walk";

    public constructor() {
        super(WalkAction.Alias, true);
    }

    public name(): string {
        return "Walk too";
    }

    public execute(_alias: string, _gameObjects: GameObject[]): ActionResult | undefined {
        return undefined;
    }
}
