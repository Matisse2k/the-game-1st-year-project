import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { gameService } from "../../global";
import { LobbyRoom } from "../rooms/LobbyRoom";
import { PlayerSession } from "../types";

/**
 * Represents the action of entering the castle.
 */
@Interface
export abstract class Enter {
    public abstract enter(): ActionResult | undefined;
}

export class EnterCastleAction extends Action {
    public static readonly Alias: string = "enter-castle";

    /**
     * Constructs a new EnterCastleAction instance.
     */
    public constructor() {
        super(EnterCastleAction.Alias, false);
    }

    /**
     * Returns the name of the action.
     * @returns {string} The name of the action.
     */
    public name(): string {
        return "Enter the Castle";
    }

    /**
     * Executes the action of entering the castle.
     * @param _alias The alias of the action.
     * @param _gameObjects The game objects involved in the action.
     * @returns {ActionResult | undefined} The result of the action.
     */
    public execute(_alias: string, _gameObjects: GameObject[]): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        // Check if the door is opened
        if (playerSession.CastleEnteranceDoorOpened) {
            // Move the player to the lobby
            playerSession.currentRoom = LobbyRoom.Alias;
            return new TextActionResult(["You enter the castle and find yourself in the lobby."]);
        }

        return new TextActionResult(["You can't enter the castle yet. The door is locked."]);
    }
}
