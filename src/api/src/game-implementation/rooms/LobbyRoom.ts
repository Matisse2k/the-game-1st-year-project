import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Room } from "../../game-base/gameObjects/Room";

export class LobbyRoom extends Room {
    public static readonly Alias: string = "lobby";

    public constructor() {
        super(LobbyRoom.Alias);
    }

    public name(): string {
        return "Lobby";
    }

    public images(): string[] {
        return ["donkereLobby", "layers/Butler"];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Hallo!",
            "Welkom in de lobby",
        ]);
    }
}
