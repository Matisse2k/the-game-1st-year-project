import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { WalkAction } from "../actions/WalkAction";
import { KnuffelbeerItem } from "../items/KnuffelbeerItem";
import { Openkamer } from "./OpenRoom";

export class LobbyRoom extends Room {
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
            new KnuffelbeerItem(),
            new Openkamer(),
        ];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new WalkAction(),
        ];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "It looks like a lobby!",
        ]);
    }
}
