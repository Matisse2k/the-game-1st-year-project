import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { TalkChoice } from "../../game-base/actions/TalkAction";
import { Character } from "../../game-base/gameObjects/Character";
import { gameService } from "../../global";
import { PlayerSession } from "../types";

export class ChefCharacter extends Character implements Examine {
    public static readonly Alias: string = "Chef";

    public constructor() {
        super(ChefCharacter.Alias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult (["A heavy aroma fills the room—warm, rich, yet oddly distinct. The chef moves with quiet precision, his gaze fixed on his work. Perhaps you should ask about the dish"]);
    }

    public name(): string {
        return ("Gustavo");
    }

    // TODO: Underscore voor choiceId weghalen
    public talk(choiceId?: number): ActionResult | undefined {
        const PlayerSession: PlayerSession = gameService.getPlayerSession();
        if (choiceId === 1) {
            return new TalkActionResult (
                this,
                [
                    "Gustavo: A tool. The right one for the job. A simple butter knife will not do.", " The cuts must be precise... clean.",
                ],
                [
                    new TalkChoice(3, "You mean a kitchen knife?"),
                    new TalkChoice(4, "Who are you?"),
                ]
            );
        }
        else if (choiceId === 2) {
            return new TalkActionResult (
                this,
                [
                    "Gustavo: Ha! Sharp instincts—fitting, considering what I require.",
                ],
                [
                    new TalkChoice(5, "You're looking for a blade, aren't you?"),
                    new TalkChoice (6, "what exactly are we talking about,"),
                ]
            );
        }
        else if (choiceId === 3) {
            PlayerSession.ChefQuestStarted = true;
            return new TextActionResult (["Yes!, that is exactly What I am missing"]);
        }
        else if (choiceId === 4) {
            return new TalkActionResult (
                this,
                [
                    "Ah, so you wish to know who I am?", " I am Gustavo, the chef of this castle—but once, I was like you, a wanderer with no place to call home.", " One stormy night, I arrived here, drawn by the scent of something… irresistible.", " I stepped into the kitchen, took up the knife, and never left.",
                ],
                [
                    new TalkChoice(3, "You mean a kitchen knife?"),
                ]
            );
        }
        else if (choiceId === 5) {
            PlayerSession.ChefQuestStarted = true;
            return new TextActionResult (["Ah! At last,", " someone who understands! Yes, yes, exactly what I need!", "You have done well!"]);
        }
        else if (choiceId === 6) {
            return new TalkActionResult (
                this,
                [
                    "Ah, take a moment…", " breathe it in. The scent, the words, the weight of what's unsaid. Look closer...", "surely, you can see it now?",
                ],
                [
                    new TalkChoice (1, "I see. And what is this missing piece?"),
                    new TalkChoice (2, "Something tells me this isn't just another ingredient"),
                ]
            );
        }
        // Shows a choice menu of 3 answers to choose from when the player starts talking to the bird
        return new TalkActionResult (
            this,
            [
                "You: That smell… it's stew, isn't it? But tell me, chef—what exactly are you preparing?",

                "Gustavo: The stew… ah, it will be unlike any other. A rich, thick broth, tender cuts, the kind that melt upon the tongue. But...", "there is one thing I still require.",
            ],
            [
                new TalkChoice(1, "I see. And what is this missing piece?"),
                new TalkChoice(2, "Something tells me this isn't just another ingredient."),
            ]
        );
    }
}
