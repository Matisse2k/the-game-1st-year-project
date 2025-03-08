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
import { TeddyBearItem } from "../items/TeddyBearItem";
import { UpperFloorRoom } from "./UpperFloor";
import { PlayerSession } from "../types";
import { BasementRoom } from "./BasementRoom";
import { CouchItem } from "../items/CouchItem";
import { CabinetItem } from "../items/CabinetItem";
import { TableItem } from "../items/TableItem";
import { SearchAction } from "../actions/SearchAction";
import { PickUpAction } from "../actions/PickUpActions";

export class LobbyRoom extends Room implements Simple, Walk {
    public static readonly Alias: string = "lobby";

    public constructor() {
        super(LobbyRoom.Alias);
    }

    public name(): string {
        return "Lobby";
    }

    public images(): string[] {
        return ["donkereLobby", "layers/Butler"];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        const objects: GameObject[] = [
            new UpperFloorRoom(),
            new ButlerCharacter(),
            new BasementRoom(),
            new CouchItem(),
            new CabinetItem(),
            new TableItem(),
        ];

        // Voeg de teddybeer alleen toe als deze is gevonden
        if (playerSession.TeddyBearFound && !playerSession.pickedupTeddyBear) {
            objects.push(new TeddyBearItem());
        }

        return objects;
    }

    /**
     * @inheritdoc
     */
    public actions(): Action[] {
        return [
            new ExamineAction(),
            new TalkAction(),
            new WalkAction(),
            new SearchAction(),
            new PickUpAction(),
            // new SimpleAction("start", "Startscherm"),
        ];
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.currentRoom !== LobbyRoom.Alias) {
            return undefined;
        }

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
            return new TextActionResult([`✅ You walked to the ${targetRoom.alias}!`]);
        }
        catch (error) {
            console.error("🔥 Fout bij het wisselen van kamer:", error);
            return new TextActionResult(["❌ Er ging iets mis bij het lopen!"]);
        }
    }
}
