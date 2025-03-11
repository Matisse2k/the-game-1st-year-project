import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Room } from "../../game-base/gameObjects/Room";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { BirdCharacter } from "../characters/BirdCharacter";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { WalkAction } from "../actions/WalkAction";
import { PlayerSession } from "../types";
import { gameService } from "../../global";
import { PathToTheCastleRoom } from "./PathToTheCastleRoom";

export class ForrestRoom extends Room {
    public static readonly Alias: string = "ForrestRoom";
    public constructor() {
        super(ForrestRoom.Alias);
    }

    public name(): string {
        return "Forrest";
    }

    public images(): string[] {
        return ["ForrestRoom", "layers/Vogel2"];
    }

    public actions(): Action[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        const actions: Action[] = [
            new ExamineAction(),
            new TalkAction(),
        ];
        if (playerSession.SpokeToBird) {
            actions.push(new WalkAction());
        }
        return actions;
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        const objects: GameObject[] = [
            new BirdCharacter(),
        ];
        if (playerSession.SpokeToBird) {
            objects.push(new PathToTheCastleRoom());
        }
        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult (["My legs feel sore....."]);
    }
}
