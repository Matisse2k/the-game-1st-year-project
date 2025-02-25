import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { LobbyRoom } from "./LobbyRoom";
import { Action } from "../../game-base/actions/Action";
import { Simple, SimpleAction } from "../../game-base/actions/SimpleAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { ServeerplaatItem } from "../items/ServeerplaatItem";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { AtticAccessItem } from "../items/AtticAccessItem";
import { BovenHalRoom } from "./BovenHalRoom";

export class GuestRoomAttic extends Room implements Simple {
    public static readonly Alias: string = "GuestRoomAttic";

    public constructor() {
        super(GuestRoomAttic.Alias);
    }

    public name(): string {
        return "Guestroom with attic";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This is a Guestroom, but what's that on the celling?",
        ]);
    }

    public actions(): Action[] {
        return [
            new SimpleAction("lobby", "Lobby"),
            new SimpleAction("bovenhal", "Bovenhal"),
            new ExamineAction(),

        ];
    }

    public objects(): GameObject[] {
        return [
            new ServeerplaatItem(),
            new AtticAccessItem(),
        ];
    }

    public images(): string[] {
        return ["GuestRoomWithItem"];
    }

    public simple(alias: string): ActionResult | undefined {
        if (alias === "lobby") {
            // TODO: plaats hier de class naam van de kamer waar je heen wilt gaan nadat je op de knop hebt gedrukt.
            const room: Room = new LobbyRoom();

            // Set the current room to the startup room
            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        if (alias === "bovenhal") {
            // TODO: plaats hier de class naam van de kamer waar je heen wilt gaan nadat je op de knop hebt gedrukt.
            const room: Room = new BovenHalRoom();

            // Set the current room to the startup room
            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }
        return undefined;
    }
}
