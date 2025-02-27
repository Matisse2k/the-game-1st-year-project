import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { PickUpAction } from "../actions/PickUpActions";
import { WalkAction } from "../actions/WalkAction";
import { DoorHandleItem } from "../items/DoorhandleItem";
import { GlueItem } from "../items/GlueItem";
import { PlayerSession } from "../types";
import { BovenHalRoom } from "./BovenHalRoom";

export class WerkkamerRoom extends Room {
    public static readonly Alias: string = "Werkkamer";

    public constructor() {
        super(WerkkamerRoom.Alias);
    }

    public name(): string {
        return "Werkkamer";
    }

    public images(): string[] {
        return ["office", "layers/lijmpot", "layers/doorhandle"];
    }

    public objects(): GameObject[] {
        return [
            new BovenHalRoom(),
            new GlueItem(),
            new DoorHandleItem(),
        ];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new WalkAction(),
            new PickUpAction(),
        ];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "What a nice office!",
        ]);
    }

    public walk(alias: string, gameObjects: GameObject[]): ActionResult {
        const getPlayerSession: PlayerSession = gameService.getPlayerSession();

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

        try {
            gameService.getPlayerSession().currentRoom = targetRoom.alias;
            console.log(`✅ Huidige kamer is nu: ${getPlayerSession.currentRoom}`);
            return new TextActionResult([`✅ You walked to ${targetRoom.alias}!`]);
        }
        catch (error) {
            console.error("🔥 Fout bij het wisselen van kamer:", error);
            return new TextActionResult(["❌ Er ging iets mis bij het lopen!"]);
            // test
        }
    }
}
