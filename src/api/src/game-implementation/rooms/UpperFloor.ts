import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { Walk, WalkAction } from "../actions/WalkAction";
import { LobbyRoom } from "./LobbyRoom";
import { PlayerSession } from "../types";
import { gameService } from "../../global";
import { GuestRoomAttic } from "./GuestRoomAttic";
import { WerkkamerRoom } from "./WerkkamerRoom";
import { GuestRoom } from "./GuestRoom";
import { Simple, SimpleAction } from "../../game-base/actions/SimpleAction";
import { BasementRoom } from "./BasementRoom";

export class UpperFloorRoom extends Room implements Simple, Walk {
    public static readonly Alias: string = "Upper Floor";

    public constructor() {
        super(UpperFloorRoom.Alias);
    }

    public name(): string {
        return "Upper Floor";
    }

    public images(): string[] {
        const baseLayers: string[] = ["Halway", "layers/Guestroomdoor", "layers/Guestroomaticdoor"];
        const playerSession: PlayerSession = gameService.getPlayerSession();
        const result: Set<string> = new Set(baseLayers);

        if (playerSession.guestdooropen) {
            result.delete("layers/Guestroomdoor");
        }

        if (playerSession.guestaticdooropen) {
            result.delete("layers/Guestroomaticdoor");
        }

        return Array.from(result);
    }

    public objects(): GameObject[] {
        return [
            new LobbyRoom(),
            new WerkkamerRoom(),
            new GuestRoomAttic(),
            new GuestRoom(),
        ];
    }

    /**
     * @inheritdoc
     */
    public actions(): Action[] {
        const actions: Action[] = [
            new ExamineAction(),
            new TalkAction(),
            new WalkAction(),
        ];

        const playerSession: PlayerSession = gameService.getPlayerSession();

        // Conditionally add SimpleActions if pickedupDoorhandle is true
        if (playerSession.pickedupDoorhandle && playerSession.inventory.includes("doorhandle")) {
            actions.push(new SimpleAction("OpenGuestAtic", "Open West Guestroom"));
            actions.push(new SimpleAction("OpenGuest", "Open East Guestroom"));
        }

        return actions;
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.currentRoom !== BasementRoom.Alias) {
            return undefined;
        }
        return new TextActionResult([
            "3 doors but witch one do i need",
        ]);
    }

    public simple(alias: string): ActionResult | undefined {
        if (alias === "OpenGuestAtic") {
            const PlayerSession: PlayerSession = gameService.getPlayerSession();

            if (PlayerSession.pickedupDoorhandle && PlayerSession.inventory.includes("doorhandle")) {
                PlayerSession.inventory = PlayerSession.inventory.filter(item => item !== "doorhandle");
                PlayerSession.guestaticdooropen = true;
                return new TextActionResult([
                    "The doorhanlde broke but you mannage to open the door to the Guestroom 1",
                ]);
            }

            if (PlayerSession.pickedupDoorhandle && PlayerSession.guestdooropen) {
                return new TextActionResult([
                    "I don't have the doorhandle anymore",
                ]);
            }

            return new TextActionResult([
                "This door is already open",
            ]);
        }

        if (alias === "OpenGuest") {
            const PlayerSession: PlayerSession = gameService.getPlayerSession();

            if (PlayerSession.pickedupDoorhandle && PlayerSession.inventory.includes("doorhandle")) {
                PlayerSession.inventory = PlayerSession.inventory.filter(item => item !== "doorhandle");
                PlayerSession.guestdooropen = true;
                return new TextActionResult([
                    "The doorhanlde broke but you mannage to open the door to the Guestroom 2",
                ]);
            }

            if (PlayerSession.pickedupDoorhandle && PlayerSession.guestaticdooropen) {
                return new TextActionResult([
                    "I don't have the doorhandle anymore",
                ]);
            }

            return new TextActionResult([
                "This door is already open",
            ]);
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

        if (PlayerSession.GhostQuestCompleted && PlayerSession.ChefQuestCompleted) {
            const room: Room = new UpperFloorRoom();
            PlayerSession.currentRoom = room.alias;
            return new TextActionResult(["✅ You walked to the Upper floor."]);
        }

        else if (PlayerSession.GhostQuestCompleted && !PlayerSession.ChefQuestCompleted) {
            return new TextActionResult(["Butler: I can't let you go there yet you haven't spoken to everybody yet"]);
        }

        else if (!PlayerSession.GhostQuestCompleted && PlayerSession.ChefQuestCompleted) {
            return new TextActionResult(["Butler: I can't let you go there yet you haven't spoken to everybody yet"]);
        }

        return new TextActionResult(["Butler: I can't let you go there yet"]);
    }
}
