import { Item } from "../../game-base/gameObjects/Item";

export class MysteriousPaperItem extends Item {
    public static readonly Alias: string = "MysteriousPaper";

    public constructor() {
        super(MysteriousPaperItem.Alias);
    }

    public name(): string {
        return "Mysterious Paper";
    }

    public getDescription(): string {
        return "A mysterious paper, maybe by inspecting it, it will reveal something more.";
    }
}
