import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { Give } from "../actions/GiveAction";
// import { gameService } from "../../global";
import { PickUp } from "../actions/PickUpActions";
import { PlayerSession } from "../types";
import { MysteriousPaperItem } from "./MysteriousPaperItem";
// import { PlayerSession } from "../types";

export class KnifeItem extends Item implements Examine, PickUp, Give {
    public static readonly Alias: string = "knife";

    public constructor() {
        super(KnifeItem.Alias);
    }

    public give(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        // Remove the knife from the player's inventory
        playerSession.inventory = playerSession.inventory.filter(item => item !== KnifeItem.Alias);
        playerSession.ChefQuestCompleted = true;
        // Add the EasterEggPaperItem to the player's inventory
        playerSession.inventory.push(MysteriousPaperItem.Alias);
        // Chef's response
        return new TextActionResult([
            "You give the knife to the chef.",
            "Chef: Thank you! This will help me a lot. Here, take this as a token of my gratitude.",
        ]);
    }

    public pickUp(): string | undefined {
        // const playerSession: PlayerSession = gameService.getPlayerSession();
        // playerSession. = true;

        return KnifeItem.Alias;
    }

    public name(): string {
        return "Knife";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["A sharp knife, the chef must have left it here."]);
    }

    public getDescription(): string {
        return "A sharp knife, the chef must have left it here.";
    }
}
