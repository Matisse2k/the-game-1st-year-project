import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { Simple } from "../../game-base/actions/SimpleAction";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { Walk, WalkAction } from "../actions/WalkAction";
import { ButlerCharacter } from "../characters/ButlerCharacter";
import { KnuffelbeerItem } from "../items/KnuffelbeerItem";
import { BovenHalRoom } from "./BovenHalRoom";
import { PlayerSession } from "../types";

export class LobbyRoom extends Room implements Simple, Walk {
    public static readonly Alias: string = "lobby";

    public constructor() {
        super(LobbyRoom.Alias);
    }

    public name(): string {
        return "Lobby";
    }

    public images(): string[] {
        return ["donkereLobby", "layers/Butler", "layers/Knuffelbeer"];
    }

    public objects(): GameObject[] {
        return [
            this,
            new BovenHalRoom(),
            new KnuffelbeerItem(),
            new ButlerCharacter(),
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
            // new SimpleAction("start", "Startscherm"),
        ];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "It looks like a lobby!",
        ]);
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
        }
    }
}
