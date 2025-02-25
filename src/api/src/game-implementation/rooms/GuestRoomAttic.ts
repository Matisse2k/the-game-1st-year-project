import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { ServeerplaatItem } from "../items/ServeerplaatItem";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { AtticAccessItem } from "../items/AtticAccessItem";
import { PlayerSession } from "../types";
import { Walk, WalkAction } from "../actions/WalkAction";
import { Simple } from "../../game-base/actions/SimpleAction";
import { BovenHalRoom } from "./BovenHalRoom";

export class GuestRoomAttic extends Room implements Simple, Walk {
    public static readonly Alias: string = "GuestRoomAttic";

    public constructor() {
        super(GuestRoomAttic.Alias);
    }

    public name(): string {
        return "Guestroom with attic";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This is a Guestroom, but what's that on the celling?",
        ]);
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new WalkAction(),
        ];
    }

    public objects(): GameObject[] {
        return [
            new ServeerplaatItem(),
            new AtticAccessItem(),
            new BovenHalRoom(),
        ];
    }

    public images(): string[] {
        return ["GuestRoomWithItem"];
    }

    public simple(_alias: string): ActionResult | undefined {
        return undefined;
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
