import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { PickUpAction } from "../actions/PickUpActions";
import { Walk, WalkAction } from "../actions/WalkAction";
import { DoorHandleItem } from "../items/DoorhandleItem";
import { GlueItem } from "../items/GlueItem";
import { PlayerSession } from "../types";
import { UpperFloorRoom } from "./UpperFloor";

export class WerkkamerRoom extends Room implements Walk {
    public static readonly Alias: string = "Werkkamer";

    public constructor() {
        super(WerkkamerRoom.Alias);
    }

    public name(): string {
        return "Office";
    }

    public images(): string[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        const result: string[] = ["office"];

        if (!playerSession.pickedupDoorhandle) {
            result.push("layers/doorhandle");
        }
        if (!playerSession.pickedupGlue) {
            result.push("layers/lijmpot");
        }

        return result;
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        const result: GameObject[] = [new UpperFloorRoom()];

        if (!playerSession.pickedupDoorhandle) {
            result.push(new DoorHandleItem());
        }

        if (!playerSession.pickedupGlue) {
            result.push(new GlueItem());
        }

        return result;
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new PickUpAction(),
            new WalkAction(),
        ];
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.currentRoom !== WerkkamerRoom.Alias) {
            return undefined;
        }
        return new TextActionResult([
            "The air is thick with dust and forgotten whispers… Papers are scattered, a broken chair creaks softly—what secrets were left behind in this abandoned office?",
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
            return new TextActionResult(["✅ You walked to the office"]);
        }
        catch (error) {
            console.error("🔥 Fout bij het wisselen van kamer:", error);
            return new TextActionResult(["❌ Er ging iets mis bij het lopen!"]);
            // test
        }
    }
}
