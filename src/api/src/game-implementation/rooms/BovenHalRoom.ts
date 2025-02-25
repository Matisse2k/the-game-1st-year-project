import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { Simple } from "../../game-base/actions/SimpleAction";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { Walk, WalkAction } from "../actions/WalkAction";
import { LobbyRoom } from "./LobbyRoom";
import { PlayerSession } from "../types";
import { gameService } from "../../global";
import { GuestRoomAttic } from "./GuestRoomAttic";

export class BovenHalRoom extends Room implements Simple, Walk {
    public static readonly Alias: string = "Bovenverdieping";

    public constructor() {
        super(BovenHalRoom.Alias);
    }

    public simple(_alias: string): ActionResult | undefined {
        return undefined;
    }

    public name(): string {
        return "Bovenhal";
    }

    public images(): string[] {
        return ["Halway"];
    }

    public objects(): GameObject[] {
        return [
            new LobbyRoom(),
            new GuestRoomAttic(),
        ];
    }

    /**
     * @inheritdoc
     */
    public actions(): Action[] {
        return [
            new ExamineAction(),
            new TalkAction(),
            new WalkAction(),
        ];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "3 doors but witch one do i need",
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
