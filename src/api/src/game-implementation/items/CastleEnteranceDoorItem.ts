import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { PlayerSession } from "../types";

export class CastleEnteranceDoorItem extends Item implements Examine {
    public static readonly Alias: string = "CastleEnteranceDoor";

    public constructor() {
        super(CastleEnteranceDoorItem.Alias);
    }

    public name(): string {
        return "Castle door";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.CastleEnteranceDoorOpened) {
            return new TextActionResult([
                "The castle door is open.", "A  beam of light spills out, piercing through the cold darkness. The warmth of the unknown beckons, casting long shadows on the stone path behind you.", "What secrets lie beyond this threshold? ",
            ]);
        }
        else {
            return new TextActionResult([
                "This is the entrance to the castle. It is a large wooden door with a large keyhole.",
            ]);
        }
    }
}
