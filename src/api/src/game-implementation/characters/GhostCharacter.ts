import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { TalkChoice } from "../../game-base/actions/TalkAction";
import { Character } from "../../game-base/gameObjects/Character";
import { gameService } from "../../global";
import { PlayerSession } from "../types";

export class GhostCharacter extends Character {
    public static readonly Alias: string = "ghost";

    public constructor() {
        super(GhostCharacter.Alias);
    }

    public name(): string {
        return "Ghost";
    }

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
            return new TextActionResult(["you step away"]);
        }
        else if (choiceId === 3) {
            return new TalkActionResult(
                this,
                [
                    "I am here because I am bound to this place by a curse. Long ago, I was the caretaker of this mansion. One night, a terrible tragedy occurred, and I was unable to save those I cared for. As punishment for my failure, my soul was condemned to wander these halls for eternity, guarding the secrets and the sorrow that linger within these walls.",
                ],
                [
                    new TalkChoice(4, "Can I help you?"),
                    new TalkChoice(2, "step away"),
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
                PlayerSession.inventory = PlayerSession.inventory.filter(item => item !== "teddy bear");
                return new TextActionResult(["Thank you for finding my teddy bear. As promised, you now have access to the first floor."]);
            }
            else {
                return new TextActionResult(["You don't have the teddy bear."]);
            }
        }
        return new TalkActionResult(
            this,
            [
                "Boo!",
            ],
            [
                new TalkChoice(1, "who are you?"),
                new TalkChoice(2, "step away"),
                ...(PlayerSession.GhostQuestStarted && !PlayerSession.GhostQuestCompleted ? [new TalkChoice(5, "Give teddy bear")] : []),
            ]
        );
    }
}
