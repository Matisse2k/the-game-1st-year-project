import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Simple } from "../../game-base/actions/SimpleAction";
import { Room } from "../../game-base/gameObjects/Room";
import { SimpleAction } from "../../game-base/actions/SimpleAction";
import { Action } from "../../game-base/actions/Action";
import { gameService } from "../../global";
import { StartupRoom } from "./StartupRoom";
import { Walk, WalkAction } from "../actions/WalkAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";

export class GoodEndingRoom extends Room implements Simple, Walk {
    public static readonly Alias: string = "GoodEndingRoom";

    public constructor() {
        super(GoodEndingRoom.Alias);
    }

    public walk(alias: string, gameObjects: GameObject[]): ActionResult {
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
            return new TextActionResult (["I escaped the castle, I can finally leave this nightmare and return home!"]);
        }
        catch (error) {
            console.error("🔥 Fout bij het wisselen van kamer:", error);
            return new TextActionResult(["❌ Er ging iets mis bij het lopen!"]);
        }
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult (["I escaped the castle, I can finally leave this nightmare and return home!"]);
    }

    public images(): string[] {
        return ["GoodEndingScene"];
    }

    public actions(): Action[] {
        new WalkAction();
        return [new SimpleAction("start-game", "End Game")];
    }

    public name(): string {
        return "home";
    }

    public simple(alias: string): ActionResult | undefined {
        if (alias === "start-game") {
            // TODO: plaats hier de class naam van de kamer waar je heen wilt gaan nadat je op start hebt gedrukt.
            const room: Room = new StartupRoom();

            // Set the current room to the startup room
            gameService.getPlayerSession().currentRoom = room.alias;
            gameService.resetPlayerSession();

            return room.examine();
        }

        return undefined;
    }
}
