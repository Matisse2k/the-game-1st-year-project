import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { Examine, ExamineAction } from "../../game-base/actions/ExamineAction";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { Walk } from "../actions/WalkAction";
import { gameService } from "../../global";
import { PlayerSession } from "../types";
import { GhostAtticCharacter } from "../characters/GhostAtticCharacter";

export class AtticRoom extends Room implements Walk, Examine {
    public static readonly Alias: string = "Attic Room";

    public constructor() {
        super(AtticRoom.Alias);
    }

    public name(): SyncOrAsync<string> {
        return "Attic";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is the attic of this room. I did not know it existed"]);
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new TalkAction(),
        ];
    }

    public objects(): GameObject[] {
        return [
            new GhostAtticCharacter(),
        ];
    }

    public images(): string[] {
        return ["AtticRoom"];
    }

    public walk(_alias: string, gameObjects: GameObject[]): ActionResult {
        const getPlayerSession: PlayerSession = gameService.getPlayerSession();

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
            if (gameService.getPlayerSession().HatchOpened === true) {
                gameService.getPlayerSession().currentRoom = targetRoom.alias;
                console.log(`✅ Huidige kamer is nu: ${getPlayerSession.currentRoom}`);
                return new TextActionResult([`✅ You walked to ${targetRoom.alias}!`]);
            }
            return new TextActionResult(["I should open the hatch first"]);
        }
        catch (error) {
            console.error("🔥 Fout bij het wisselen van kamer:", error);
            return new TextActionResult(["❌ Er ging iets mis bij het lopen!"]);
            // test
        }
    }
}
