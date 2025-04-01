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
import { UpperFloorRoom } from "./UpperFloor";
import { PickUpAction } from "../actions/PickUpActions";
import { BirdCharachter } from "../characters/GuestBirdCharachter";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { AtticRoom } from "./AtticRoom";
import { OpenAction } from "../actions/OpenAction";
import { MysteriousStickItem } from "../items/MysteriousStickItem";
import { SwitchPageActionResult } from "../actionResults/SwitchPageActionResult";

export class GuestRoomAttic extends Room implements Simple, Walk {
    public static readonly Alias: string = "GuestRoomAttic";

    public constructor() {
        super(GuestRoomAttic.Alias);
    }

    public name(): string {
        return "West Guestroom";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.currentRoom !== GuestRoomAttic.Alias) {
            return undefined;
        }
        return new TextActionResult([
            "This is a Guestroom, but there is a hatch on the celling.",
        ]);
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new TalkAction(),
            new WalkAction(),
            new PickUpAction(),
            new OpenAction(),
        ];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (gameService.getPlayerSession().HatchOpened === true) {
            return [
                new AtticRoom(),
            ];
        }
        // Basisobjecten die altijd worden getoond
        const objects: GameObject[] = [
            new AtticAccessItem(),
            new BirdCharachter(),
            new UpperFloorRoom(),
        ];

        // Voeg ServeerplaatItem alleen toe als het nog niet in de inventaris zit
        if (!playerSession.seveerplaat) {
            objects.push(new ServeerplaatItem());
        }

        // Voeg MysteriousStickItem alleen toe als het nog niet in de inventaris zit
        if (!playerSession.mysteriousStickPickedUp) {
            objects.push(new MysteriousStickItem());
        }

        return objects;
    }

    public images(): string[] {
        const baseLayers: string[] = ["GuestroomWithAttic", "layers/ServingPlatterFrame", "layers/WoodenStickFrame", "layers/BirdCharachterFrame"];
        const result: Set<string> = new Set(baseLayers);
        if (gameService.getPlayerSession().inventory.includes("Serving platter")) {
            result.delete("layers/ServingPlatterFrame");
        }
        if (gameService.getPlayerSession().inventory.includes("MysteriousStick")) {
            result.delete("layers/WoodenStickFrame");
        }
        return Array.from(result);
    }

    public simple(alias: string): ActionResult | undefined {
        if (alias === "show-map") {
            console.log("🗺️ Navigating to Plattegrond page..."); // Debugging log
            try {
                return new SwitchPageActionResult("plattegrond");
            }
            catch (error) {
                console.error("🔥 Fout bij het wisselen naar plattegrond:", error);
                return new TextActionResult(["❌ Er ging iets mis bij het tonen van de kaart!"]);
            }
        }
        return undefined;
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

        if (PlayerSession.guestaticdooropen) {
            const room: Room = new GuestRoomAttic();
            PlayerSession.currentRoom = room.alias;
            return new TextActionResult(["You walked to the Guest room"]);
        }
        return new TextActionResult(["This door is locked, it looks like a door handle is missing."]);
    }
}
