import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";

export abstract class Walk {
    /**
     * Execute the Walk action
     *
     * @param alias The alias of the action
     * @param gameObjects The game objects involved in the action
     * @returns Result of the Walk action
     */
    public abstract walk(alias: string, gameObjects: GameObject[]): ActionResult;
}

export class WalkAction extends Action {
    public static readonly Alias: string = "walk";

    public constructor() {
        super(WalkAction.Alias, true);
    }

    public name(): string {
        return "Walk to";
    }

    public execute(alias: string, gameObjects: GameObject[]): ActionResult {
        console.log("🚀 WalkAction executed!");
        console.log("👉 Alias ontvangen:", alias);
        console.log("🎭 GameObjects ontvangen:", gameObjects.map(obj => obj.name()));

        if (gameObjects.length === 0) {
            return new TextActionResult(["❌ No objects selected to walk to!"]);
        }

        // hier kijkt hij wat de gameobject is van de kamer.
        const targetRoom: Room | undefined = gameObjects.find(obj => obj instanceof Room);

        // Als er geen kamer kan worden gevonden om naar toe te lopen is dit het resultaat
        if (!targetRoom) {
            console.error("❌ Geen geldige kamer gevonden!");
            return new TextActionResult(["❌ You can't walk to that!"]);
        }

        // oude code en die werkte niet.
        // if (targetRoom instanceof Walk) {
        //     return targetRoom.walk(alias, gameObjects);
        // }

        // Waarom werkt dit nu? De combinatie van instanceof Room en "walk" in targetRoom
        // zorgt ervoor dat targetRoom zowel een Room-object is als de walk-methode implementeert.
        // Dit voorkomt fouten waarbij targetRoom niet de juiste methode heeft.

        // Roep de walk-methode aan van de targetRoom
        if (targetRoom instanceof Room && "walk" in targetRoom) {
            return (targetRoom as Walk).walk(alias, gameObjects);
        }
        else {
            return new TextActionResult(["❌ The target room does not support walking!"]);
        }
    }
}
