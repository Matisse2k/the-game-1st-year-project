import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { WalkAction } from "../actions/WalkAction";
import { DoorHandleItem } from "../items/DoorhandleItem";
import { GlueItem } from "../items/GlueItem";
import { BovenHalRoom } from "./BovenHalRoom";

export class WerkkamerRoom extends Room {
    public static readonly Alias: string = "Werkkamer";

    public constructor() {
        super(WerkkamerRoom.Alias);
    }

    public name(): string {
        return "Werkkamer";
    }

    public images(): string[] {
        return ["office", "layers/lijmpot", "layers/doorhandle"];
    }

    public objects(): GameObject[] {
        return [
            new BovenHalRoom(),
            new GlueItem(),
            new DoorHandleItem(),
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
            "What a nice office!",
        ]);
    }
}
