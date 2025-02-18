import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { Simple, SimpleAction } from "../../game-base/actions/SimpleAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { WalkAction } from "../actions/WalkAction";
import { LobbyRoom } from "./LobbyRoom";

export class BovenHalRoom extends Room implements Simple {
    public static readonly Alias: string = "bovenhal";

    public constructor() {
        super(BovenHalRoom.Alias);
    }

    public name(): string {
        return "Bovenhal";
    }

    public images(): string[] {
        return ["lobby"];
    }

    public objects(): GameObject[] {
        return [
            new LobbyRoom(),
        ];
    }

    /**
     * @inheritdoc
     */
    public actions(): Action[] {
        return [
            new SimpleAction("lobby", "Lobby"),
            new WalkAction(),
        ];
    }

    public simple(alias: string): ActionResult | undefined {
        if (alias === "lobby") {
            // TODO: plaats hier de class naam van de kamer waar je heen wilt gaan nadat je op de knop hebt gedrukt.
            const room: Room = new LobbyRoom();

            // Set the current room to the startup room
            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }
        return undefined;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "What a big open room!",
        ]);
    }
}
