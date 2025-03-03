import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { Walk, WalkAction } from "../actions/WalkAction";
import { GhostCharacter } from "../characters/GhostCharacter";
import { PlayerSession } from "../types";
import { LobbyRoom } from "./LobbyRoom";

export class BasementRoom extends Room implements Walk {
    public static readonly Alias: string = "Basement";

    /**
     * Constructs a new PathToTheCastleRoom instance.
     */
    public constructor() {
        super(BasementRoom.Alias);
    }

    /**
     * Returns the name of the room.
     * @returns {string} The name of the room.
     */
    public name(): string {
        return "Basement";
    }

    public images(): string[] {
        return ["BasementRoom"];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You descend the creaky stairs into the damp, musty basement.",
            "Dim light from a flickering bulb casts eerie shadows.",
            "In the middle of the room, you see a ghostly figure hovering silently. Cobwebs hang from the ceiling."]);
    }

    public objects(): GameObject[] {
        return [
            new LobbyRoom(),
            new GhostCharacter(),
        ];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new WalkAction(),
            new TalkAction(),
        ];
    }

    public walk(_alias: string, gameObjects: GameObject[]): ActionResult {
        const PlayerSession: PlayerSession = gameService.getPlayerSession();

        // hier kijkt hij wat de gameobject is van de kamer.
        const targetRoom: Room | undefined = gameObjects.find(obj => obj instanceof Room);

        // Als er geen kamer kan worden gevonden om naar toe te lopen is dit het resultaat
        if (!targetRoom) {
            console.error("❌ Geen geldige kamer gevonden!");
            return new TextActionResult(["❌ You can't walk to that!"]);
        }

        // Update the player's current room to the target room
        PlayerSession.currentRoom = targetRoom.alias;
        // Call the examine method of the target room
        return targetRoom.examine() || new TextActionResult([`✅ You walked to the ${targetRoom.alias}!`]);
    }
}
