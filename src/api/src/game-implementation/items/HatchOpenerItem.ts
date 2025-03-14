import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { PickUp } from "../actions/PickUpActions";

export class HatchOpenerItem extends Item implements PickUp {
    public static readonly Alias: string = "HatchOpener";

    public constructor() {
        super (HatchOpenerItem.Alias);
    }

    public name(): string {
        return "Hatch Opener";
    }

    public pickUp(): string | undefined {
        if (gameService.getPlayerSession().inventory.includes("HatchOpener")) {
            return undefined;
        }
        return HatchOpenerItem.Alias;
    }
}
