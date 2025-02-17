import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Room } from "../../game-base/gameObjects/Room";

export class GuestRoomAttic extends Room {
    public static readonly Alias: string = "GuestRoomAttic";

    public constructor() {
        super(GuestRoomAttic.Alias);
    }

    public name(): string {
        return "Guestroom with attic";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Hallo, dis is een test",
        ]);
    }
}
