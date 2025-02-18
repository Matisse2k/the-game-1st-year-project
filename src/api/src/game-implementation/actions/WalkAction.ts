import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { Simple, SimpleAction } from "../../game-base/actions/SimpleAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { LobbyRoom } from "../rooms/LobbyRoom";

@Interface
export abstract class Walk {
    public abstract walk(): ActionResult | undefined;
}

export class WalkAction extends Action implements Simple {
    public static readonly Alias: string = "walk";

    public constructor() {
        super(WalkAction.Alias, true);
    }

    public actions(): Action[] {
        return [new SimpleAction("lobby", "Lobby")];
    }

    public name(): string {
        return "Walk too";
    }

    public simple(alias: string): ActionResult | undefined {
        if (alias === "lobby") {
            // TODO: plaats hier de class naam van de kamer waar je heen wilt gaan nadat je op start hebt gedrukt.
            const room: Room = new LobbyRoom();

            // Set the current room to the startup room
            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }
        return undefined;
    }

    public execute(_alias: string, _gameObjects: GameObject[]): ActionResult | undefined {
        return undefined;
    }
}
