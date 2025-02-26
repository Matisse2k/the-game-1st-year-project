import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { gameService } from "../../global";

@Interface
export abstract class PickUp {
    public abstract pickUp(): string | undefined;
}

export class PickUpAction extends Action {
    public static readonly Alias: string = "PickUp";

    public constructor() {
        super(PickUpAction.Alias, true);
    }

    public name(): string {
        return "Pick Up";
    }

    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        const gameobject: GameObject = gameObjects[0];
        console.log("wordt uitgevoerd");
        if (gameobject.instanceOf(PickUp)) {
            const itemAlias: string | undefined = gameobject.pickUp();
            if (itemAlias) {
                // Voeg het item toe aan de inventory van de speler
                gameService.getPlayerSession().inventory.push(itemAlias);
                console.log(gameService.getPlayerSession().inventory);
                return new TextActionResult([`You picked up ${itemAlias}`]);
            }
        }
        return new TextActionResult(["I can't pick that up"]);
    }
}
