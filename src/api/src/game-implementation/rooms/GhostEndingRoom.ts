import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { Simple, SimpleAction } from "../../game-base/actions/SimpleAction";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { StartupRoom } from "./StartupRoom";

export class GhostEndingRoom extends Room implements Simple {
    public static readonly Alias: string = "Ghost Ending Room";

    public constructor() {
        super(GhostEndingRoom.Alias);
    }

    public name(): string {
        return "Ghost Realm";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([" You transformed into a ghost, and now you are in the ghost realm of this castle.\n\n You are stuck here forever."]);
    }

    public images(): string[] {
        return ["ghostsEnding"];
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
