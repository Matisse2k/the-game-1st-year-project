import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { Simple } from "../../game-base/actions/SimpleAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { SwitchPageActionResult } from "../actionResults/SwitchPageActionResult";
import { PickUpAction } from "../actions/PickUpActions";
import { SearchAction } from "../actions/SearchAction";
import { Walk, WalkAction } from "../actions/WalkAction";
import { KeyItem } from "../items/KeyItem";
import { LowerRightStoneItem } from "../items/Stone1Item";
import { UpperRightStoneItem } from "../items/Stone2Item";
import { LowerLeftStoneItem } from "../items/Stone3Item";
import { UpperLeftStoneItem } from "../items/Stone4Item";
import { StonesItem } from "../items/StonesItem";
import { PlayerSession } from "../types";
import { CastleDoorEnteranceRoom } from "./CastleDoorEnteranceRoom";

export class PathToTheCastleRoom extends Room implements Walk, Simple {
    public static readonly Alias: string = "PathToTheCastle";

    /**
     * Constructs a new PathToTheCastleRoom instance.
     */
    public constructor() {
        super(PathToTheCastleRoom.Alias);
    }

    /**
     * Returns the name of the room.
     * @returns {string} The name of the room.
     */
    public name(): string {
        return "Path to the Castle";
    }

    /**
     * Returns the images to be displayed in the room based on the player's session.
     * @returns {string[]} An array of image layer names.
     */
    public images(): string[] {
        const baseLayers: string[] = ["pathtothecastle", "layers/steen1", "layers/steen2", "layers/sleutel", "layers/steen3", "layers/steen4"];
        const playerSession: PlayerSession = gameService.getPlayerSession();
        const result: Set<string> = new Set(baseLayers);

        if (playerSession.lookedUnderStone1) {
            result.delete("layers/steen1");
        }
        if (playerSession.lookedUnderStone2) {
            result.delete("layers/steen2");
        }
        if (playerSession.lookedUnderStone3) {
            result.delete("layers/steen3");
        }
        if (playerSession.lookedUnderStone4) {
            result.delete("layers/steen4");
        }

        if (playerSession.keyFound) {
            result.delete("layers/sleutel");
        }

        return Array.from(result);
    }

    /**
     * Returns the game objects present in the room.
     * @returns {GameObject[]} An array of game objects.
     */
    public objects(): GameObject[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        const objects: GameObject[] = [
            new StonesItem(),
            new CastleDoorEnteranceRoom(),
        ];

        // Only add stones that the player hasn't looked under yet
        if (!playerSession.lookedUnderStone1) {
            objects.push(new LowerRightStoneItem());
        }

        if (!playerSession.lookedUnderStone2) {
            objects.push(new UpperRightStoneItem());
        }

        if (!playerSession.lookedUnderStone3) {
            objects.push(new LowerLeftStoneItem());
        }

        if (!playerSession.lookedUnderStone4) {
            objects.push(new UpperLeftStoneItem());
        }

        // Voeg de sleutel alleen toe als deze is gevonden en niet in de inventaris zit
        if (playerSession.lookedUnderStone3 && !playerSession.inventory.includes(KeyItem.Alias)) {
            objects.push(new KeyItem());
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
            new SearchAction(),
            new WalkAction(),
            new PickUpAction(),
        ];
    }

    /**
     * Returns the result of examining the room.
     * @returns {ActionResult | undefined} The result of the examination.
     */
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.currentRoom !== PathToTheCastleRoom.Alias) {
            return undefined;
        }
        return new TextActionResult([
            "You notice a narrow path winding between the ancient trees of the forest. The trees are old and gnarled, their twisted branches creating eerie shadows on the ground. In the distance, you can see the silhouette of the castle.",
        ]);
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

    public simple(alias: string): ActionResult | undefined {
        if (alias === "open-notebook") {
            console.log("📔 Navigating to Notebook page..."); // Debugging log
            try {
                return new SwitchPageActionResult("notebook");
            }
            catch (error) {
                console.error("🔥 Fout bij het wisselen naar notebook:", error);
                return new TextActionResult(["❌ Er ging iets mis bij het openen van het notitieboek!"]);
            }
        }

        return undefined;
    }
}
