import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { TalkChoice } from "../../game-base/actions/TalkAction";
import { Character } from "../../game-base/gameObjects/Character";
import { gameService } from "../../global";
import { PlayerSession } from "../types";

/**
 * Represents the GhostCharacter in the game.
 */
export class GhostCharacter extends Character implements Examine {
    public static readonly Alias: string = "ghost";

    /**
     * Constructs a new GhostCharacter instance.
     */
    public constructor() {
        super(GhostCharacter.Alias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["A ghostly figure hovers silently in the middle of the room."]);
    }

    /**
     * Returns the name of the character.
     * @returns {string} The name of the character.
     */
    public name(): string {
        return "Ghost";
    }

    /**
     * Handles the talk action for the GhostCharacter.
     * @param {number} [choiceId] - The ID of the chosen dialogue option.
     * @returns {ActionResult | undefined} The result of the talk action.
     */
    public talk(choiceId?: number): ActionResult | undefined {
        const PlayerSession: PlayerSession = gameService.getPlayerSession();
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                [
                    "I am the ghost of the mansion",
                ],
                [
                    new TalkChoice(3, "Why are you here?"),
                    new TalkChoice(4, "Can I help you?"),
                ]
            );
        }
        else if (choiceId === 2) {
            return new TextActionResult(["You step away."]);
        }
        else if (choiceId === 3) {
            return new TalkActionResult(
                this,
                [
                    "I am here because I am bound to this place by a curse. Long ago, I was the caretaker of this mansion. One night, a terrible tragedy occurred, and I was unable to save those I cared for. As punishment for my failure, my soul was condemned to wander these halls for eternity, guarding the secrets and the sorrow that linger within these walls.",
                ],
                [
                    new TalkChoice(4, "Can I help you?"),
                    new TalkChoice(2, "Step away"),
                ]
            );
        }
        else if (choiceId === 4) {
            if (PlayerSession.GhostQuestCompleted) {
                return new TextActionResult(["Thank you for your help. I can now rest in peace."]);
            }
            else {
                PlayerSession.GhostQuestStarted = true;
                return new TextActionResult(["There is one thing you could do for me. I lost my teddy bear somewhere in this mansion. It was the only thing that brought me comfort in this cursed place. If you find it and bring it back to me, I will grant you access to the first floor."]);
            }
        }
        else if (choiceId === 5) {
            if (PlayerSession.TeddyBearFound) {
                PlayerSession.GhostQuestCompleted = true;
                PlayerSession.inventory = PlayerSession.inventory.filter(item => item !== "teddybear");
                return new TextActionResult(["Thank you for finding my teddy bear. As promised, you now have my *permission* to go to the Upper floor."]);
            }
            else {
                return new TextActionResult(["You don't have the teddy bear."]);
            }
        }
        else if (choiceId === 6) {
            if (PlayerSession.ChefQuestStarted && !PlayerSession.inventory.includes("knife") && !PlayerSession.knifeGiven && !PlayerSession.ChefQuestCompleted) {
                PlayerSession.knifeGiven = true; // Set knifeGiven to true
                return new TextActionResult(["You are looking for the knife aren't you?", "I can help you with that. The knife lays on the table right next to me, just pick it up."]);
            }
            else if (PlayerSession.knifeGiven && !PlayerSession.ChefQuestCompleted) {
                return new TextActionResult(["I've already helped you with the knife. It should be on the table if you haven't picked it up yet."]);
            }
            else if (PlayerSession.ChefQuestCompleted) {
                return new TextActionResult(["I see you've already given the knife to the chef. I'm glad I could help."]);
            }
        }
        return new TalkActionResult(
            this,
            [
                "Boo!",
            ],
            [
                new TalkChoice(1, "Who are you?"),
                new TalkChoice(2, "Step away"),
                ...(PlayerSession.GhostQuestStarted && !PlayerSession.GhostQuestCompleted ? [new TalkChoice(5, "Give teddy bear")] : []),
                ...(PlayerSession.ChefQuestStarted && !PlayerSession.ChefQuestCompleted ? [new TalkChoice(6, "Ask for help with chef's quest")] : []),
            ]
        );
    }
}
