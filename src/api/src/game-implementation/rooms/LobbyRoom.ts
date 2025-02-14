import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { WalkAction } from "../actions/WalkAction";
import { ButlerCharacter } from "../characters/ButlerCharacter";
import { KnuffelbeerItem } from "../items/KnuffelbeerItem";

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
            new ButlerCharacter(),
        ];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new WalkAction(),
            new TalkAction(),
        ];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "It looks like a lobby!",
        ]);
    }
}
