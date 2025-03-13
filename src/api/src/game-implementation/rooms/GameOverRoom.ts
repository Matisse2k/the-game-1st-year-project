import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { Simple, SimpleAction } from "../../game-base/actions/SimpleAction";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { StartupRoom } from "./StartupRoom";

export class GameOverRoom extends Room implements Simple {
    public static readonly Alias: string = "GameOver";

    /**
     * Constructs a new PathToTheCastleRoom instance.
     */
    public constructor() {
        super(GameOverRoom.Alias);
    }

    /**
     * Returns the name of the room.
     * @returns {string} The name of the room.
     */
    public name(): string {
        return "Game Over";
    }

    public images(): string[] {
        return ["gameOverGif"];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You failed the quiz and the guard left you rot in the castle",
        ]);
    }

    public actions(): Action[] {
        return [new SimpleAction("quit-game", "Quit Game")];
    }

    /**
     * @inheritdoc
     */
    public simple(alias: string): ActionResult | undefined {
        if (alias === "quit-game") {
            // Reset the player session
            gameService.resetPlayerSession();

            // Create a new StartupRoom instance
            const room: Room = new StartupRoom();

            // Set the current room to the startup room
            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}
