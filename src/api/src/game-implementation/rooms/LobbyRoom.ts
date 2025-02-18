import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { Simple, SimpleAction } from "../../game-base/actions/SimpleAction";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { WalkAction } from "../actions/WalkAction";
import { ButlerCharacter } from "../characters/ButlerCharacter";
import { KnuffelbeerItem } from "../items/KnuffelbeerItem";
import { BovenHalRoom } from "./BovenHalRoom";
import { StartupRoom } from "./StartupRoom";

export class LobbyRoom extends Room implements Simple {
    public static readonly Alias: string = "lobby";

    public constructor() {
        super(LobbyRoom.Alias);
    }

    public name(): string {
        return "Lobby";
    }

    public images(): string[] {
        return ["donkereLobby", "layers/Butler", "layers/Knuffelbeer"];
    }

    public objects(): GameObject[] {
        return [
            new BovenHalRoom(),
            new KnuffelbeerItem(),
            new ButlerCharacter(),
        ];
    }

    /**
     * @inheritdoc
     */
    public actions(): Action[] {
        return [
            new ExamineAction(),
            new WalkAction(),
            new TalkAction(),
            new SimpleAction("start", "Startscherm"),
            new SimpleAction("Hal", "Boven verdieping"),
        ];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "It looks like a lobby!",
        ]);
    }

    public simple(alias: string): ActionResult | undefined {
        if (alias === "start") {
            // TODO: plaats hier de class naam van de kamer waar je heen wilt gaan nadat je op start hebt gedrukt.
            const room: Room = new StartupRoom();

            // Set the current room to the startup room
            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }
        if (alias === "Hal") {
            // TODO: plaats hier de class naam van de kamer waar je heen wilt gaan nadat je op start hebt gedrukt.
            const room: Room = new BovenHalRoom();

            // Set the current room to the startup room
            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}
