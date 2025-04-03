import { Item } from "../../game-base/gameObjects/Item";

export class HatchOpenerItem extends Item {
    public static readonly Alias: string = "Mysterious object";

    public constructor() {
        super (HatchOpenerItem.Alias);
    }

    public name(): string {
        return "Mysterious object";
    }

    public getDescription(): string {
        return "A mysterious object that seems to be able to open the hatch";
    }
}
