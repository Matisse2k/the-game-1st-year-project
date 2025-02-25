import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { SearchAction } from "../actions/SearchAction";
import { WalkAction } from "../actions/WalkAction";
import { KeyItem } from "../items/KeyItem";
import { StonesItem } from "../items/StonesItem";
import { PlayerSession } from "../types";
import { CastleDoorEnteranceRoom } from "./CastleDoorEnteranceRoom";

export class PathToTheCastleRoom extends Room {
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
        // TODO: change with the pick ip action
        /* if (playerSession.keyFound) {
            result.delete("layers/sleutel");
        } */

        return Array.from(result);
    }

    /**
     * Returns the game objects present in the room.
     * @returns {GameObject[]} An array of game objects.
     */
    public objects(): GameObject[] {
        return [
            new StonesItem(),
            new KeyItem(),
            new CastleDoorEnteranceRoom(),
        ];
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
        ];
    }

    /**
     * Returns the result of examining the room.
     * @returns {ActionResult | undefined} The result of the examination.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You notice a narrow path winding between the ancient trees of the forest. The trees are old and gnarled, their twisted branches creating eerie shadows on the ground. In the distance, you can see the silhouette of the castle.",
        ]);
    }
}
