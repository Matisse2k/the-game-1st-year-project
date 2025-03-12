import { Item } from "../../game-base/gameObjects/Item";

export class EasterEggPaperItem extends Item {
    public static readonly Alias: string = "EasterEggPaperItem";

    public constructor() {
        super(EasterEggPaperItem.Alias);
    }

    public name(): string {
        return "Mysterious Paper";
    }
}
