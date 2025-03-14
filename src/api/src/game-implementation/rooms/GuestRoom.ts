import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { Walk, WalkAction } from "../actions/WalkAction";
import { RavenCharacter } from "../characters/RavenCharacter";
import { PlayerSession } from "../types";
import { UpperFloorRoom } from "./UpperFloor";

export class GuestRoom extends Room implements Walk {
    public static readonly Alias: string = "GuestRoom";

    public constructor() {
        super(GuestRoom.Alias);
    }

    public name(): string {
        return "East GuestRoom";
    }

    public images(): string[] {
        return ["GuestRoom", "layers/Raven"];
    }

    public objects(): GameObject[] {
        return [
            new UpperFloorRoom(),
            new RavenCharacter(),

        ];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new TalkAction(),
            new WalkAction(),

        ];
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.currentRoom !== GuestRoom.Alias) {
            return undefined;
        }
        return new TextActionResult([
            "An eerie silence fills the room, as if time has stood still. I don't know if i made the right choice for the room.",
        ]);
    }

    public walk(alias: string, gameObjects: GameObject[]): ActionResult {
        const PlayerSession: PlayerSession = gameService.getPlayerSession();

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

        if (PlayerSession.guestdooropen) {
            const room: Room = new GuestRoom();
            PlayerSession.currentRoom = room.alias;
            return new TextActionResult(["You walked to the Guest room"]);
        }
        return new TextActionResult(["This door is locked, it looks like a door handle is missing."]);
    }
}
