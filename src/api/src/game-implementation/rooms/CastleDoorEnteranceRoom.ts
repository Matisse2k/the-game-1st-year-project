import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { Simple, SimpleAction } from "../../game-base/actions/SimpleAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { UseItemAction } from "../actions/UseItemAction";
import { Walk } from "../actions/WalkAction";
import { CastleEnteranceDoorItem } from "../items/CastleEnteranceDoorItem";
import { KeyItem } from "../items/KeyItem";
import { PlayerSession } from "../types";
import { LobbyRoom } from "./LobbyRoom";

/**
 * Represents the Castle Door Entrance room in the game.
 */
export class CastleDoorEnteranceRoom extends Room implements Walk, Simple {
    public static readonly Alias: string = "castle-door-enterance";

    /**
     * Constructs a new CastleDoorEnterance instance.
     */
    public constructor() {
        super(CastleDoorEnteranceRoom.Alias);
    }

    /**
     * Returns the name of the room.
     * @returns {string} The name of the room.
     */
    public name(): string {
        return "Castle Door Enterance";
    }

    /**
     * Returns the images associated with the room.
     * @returns {string[]} The images associated with the room.
     */
    public images(): string[] {
        const result: string[] = ["Castle_entrance"];

        if (gameService.getPlayerSession().CastleEnteranceDoorOpened) {
            result.push("layers/Open_Castle_Door");
        }
        return result;
    }

    /**
     * Returns the objects present in the room.
     * @returns {GameObject[]} The objects present in the room.
     */
    public objects(): GameObject[] {
        return [
            new CastleEnteranceDoorItem(),
            new KeyItem(),
        ];
    }

    /**
     * Returns the actions that can be performed in the room.
     * @returns {Action[]} The actions that can be performed in the room.
     */
    public actions(): Action[] {
        return [
            new ExamineAction(),
            new UseItemAction(),
            new SimpleAction("Enter the castle", "enter castle")];
    }

    public walk(_alias: string, gameObjects: GameObject[]): ActionResult {
        const PlayerSession: PlayerSession = gameService.getPlayerSession();

        // hier kijkt hij wat de gameobject is van de kamer.
        const targetRoom: Room | undefined = gameObjects.find(obj => obj instanceof Room);

        // Als er geen kamer kan worden gevonden om naar toe te lopen is dit het resultaat
        if (!targetRoom) {
            return new TextActionResult(["❌ You can't walk to that!"]);
        }
        // Controleer of de speler de sleutel heeft
        if (PlayerSession.keyFound) {
            const room: Room = new CastleDoorEnteranceRoom();
            PlayerSession.currentRoom = room.alias;
            return new TextActionResult(["You walked to the Castle Door Entrance.", "You stand before the grand entrance of the castle. The massive wooden doors are adorned with intricate carvings and iron reinforcements. The air is filled with a sense of history and mystery."]);
        }
        if (PlayerSession.lookedUnderStone3) {
            return new TextActionResult(["You first need to pick up the key before going further."]);
        }
        return new TextActionResult(["You first need to find the key to go further."]);
    }

    public simple(alias: string): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (alias === "Enter the castle" && playerSession.CastleEnteranceDoorOpened) {
            const room: Room = new LobbyRoom();

            // Set the current room to the startup room
            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return new TextActionResult(["The castle door is closed."]);
    }

    /**
     * Examines the room and returns a description.
     * @returns {ActionResult | undefined} The result of the examination.
     */
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.CastleEnteranceDoorOpened) {
            return new TextActionResult([
                "The castle door is open.",
                "A beam of light spills out, piercing through the cold darkness. The warmth of the unknown beckons, casting long shadows on the stone path behind you.",
                "What secrets lie beyond this threshold?",
            ]);
        }
        else {
            return new TextActionResult([
                "You stand before the grand entrance of the castle. The massive wooden doors are adorned with intricate carvings and iron reinforcements. The air is filled with a sense of history and mystery.",
            ]);
        }
    }
}
