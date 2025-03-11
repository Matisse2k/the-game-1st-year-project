import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { Simple, SimpleAction } from "../../game-base/actions/SimpleAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { StartAreaItem } from "../items/StartAreaItem";
import { ForrestRoom } from "./ForrestRoom";

export class WakeUpRoom extends Room implements Simple {
    public static readonly Alias: string = "WakeUpRoom";
    public constructor() {
        super(WakeUpRoom.Alias);
    }

    public name(): string {
        return "WakeUpRoom";
    }

    public images(): string[] {
        return ["WakeUpRoom"];
    }

    /**
         * Returns the actions available in the room.
         * @returns {Action[]} An array of actions.
         */
    public actions(): Action[] {
        return [
            new ExamineAction(),
            new SimpleAction("StandUp", "Stand up"),
        ];
    }

    public objects(): GameObject [] {
        return [new StartAreaItem(),
        ];
    }

    /**
     * Returns text array when entering this scene
     */

    public examine(): ActionResult | undefined {
        return new TextActionResult(["'Ugh... my head...'"]);
    }

    /**
         * @inheritdoc
         */
    public simple(alias: string): ActionResult | undefined {
        if (alias === "StandUp") {
            // TODO: plaats hier de class naam van de kamer waar je heen wilt gaan nadat je op start hebt gedrukt.
            const room: Room = new ForrestRoom();

            // Set the current room to the startup room
            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}
