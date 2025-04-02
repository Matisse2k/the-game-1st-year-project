import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { Simple, SimpleAction } from "../../game-base/actions/SimpleAction";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { WakeUpRoom } from "./WakeUpRoom";

/**
 * Implemention of the startup room
 *
 * @remarks Used as the first room for new player sessions.
 */
export class StartupRoom extends Room implements Simple {
    /** Alias of this room */
    public static readonly Alias: string = "startup";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(StartupRoom.Alias);
    }

    /**
     * @inheritdoc
     */
    public name(): string {
        return "The shadows of the forgotten Castle";
    }

    /**
     * @inheritdoc
     */
    public images(): string[] {
        return ["logo"];
    }

    /**
     * @inheritdoc
     */
    public actions(): Action[] {
        return [new SimpleAction("start-game", "Start Game")];
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([""]); // TODO: Ask if this is nessesary
    }

    /**
     * @inheritdoc
     */
    public simple(alias: string): ActionResult | undefined {
        if (alias === "start-game-from-image") {
            // TODO: plaats hier de class naam van de kamer waar je heen wilt gaan nadat je op start hebt gedrukt.
            const room: Room = new WakeUpRoom();

            // Set the current room to the startup room
            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}
