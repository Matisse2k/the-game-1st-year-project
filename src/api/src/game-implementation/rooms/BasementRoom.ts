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
import { BookshelfItem } from "../items/BookshelfItem";
import { PickUpAction } from "../actions/PickUpActions";
import { KnifeItem } from "../items/KnifeItem";

/**
 * Represents the BasementRoom in the game.
 */
export class BasementRoom extends Room implements Walk {
    public static readonly Alias: string = "Basement";

    /**
     * Constructs a new BasementRoom instance.
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

    /**
     * Returns the images to be displayed in the room.
     * @returns {string[]} An array of image layer names.
     */
    public images(): string[] {
        return ["BasementRoom"];
    }

    /**
     * Returns the result of examining the room.
     * @returns {ActionResult | undefined} The result of the examination.
     */
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.currentRoom !== BasementRoom.Alias) {
            return undefined;
        }
        return new TextActionResult([
            "You descend the creaky stairs into the damp, musty basement.",
            "Dim light from a flickering bulb casts eerie shadows.",
            "In the middle of the room, you see a ghostly figure hovering silently. Cobwebs hang from the ceiling.",
        ]);
    }

    /**
     * Returns the game objects present in the room.
     * @returns {GameObject[]} An array of game objects.
     */
    public objects(): GameObject[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        const objects: GameObject[] = [
            new LobbyRoom(),
            new GhostCharacter(),
            new BookshelfItem(),
        ];

        // Voeg het mes toe als het door de geest is gegeven
        if (playerSession.knifeGiven && !playerSession.inventory.includes("knife")) {
            objects.push(new KnifeItem());
        }

        return objects;
    }

    /**
     * Returns the actions available in the room.
     * @returns {Action[]} An array of actions.
     */
    public actions(): Action[] {
        return [
            new ExamineAction(),
            new TalkAction(),
            new WalkAction(),
            new PickUpAction(),
        ];
    }

    /**
     * Handles the walk action in the room.
     * @param {string} _alias - The alias of the target object.
     * @param {GameObject[]} gameObjects - The game objects to walk to.
     * @returns {ActionResult} The result of the walk action.
     */
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
