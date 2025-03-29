import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { TalkChoice } from "../../game-base/actions/TalkAction";
import { Character } from "../../game-base/gameObjects/Character";
import { gameService } from "../../global";

export class BirdCharacter extends Character implements Examine {
    public static readonly Alias: string = "Raven";

    public constructor() {
        super(BirdCharacter.Alias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult ([
            "This raven sits alone, unnaturally still, as if it has been waiting.\n\n",
            "In the vast, tangled depths of the forest, its presence feels less like coincidence… and more like design.",
        ]);
    }

    public name(): string {
        return "Raven";
    }

    /**
 * Handles the conversation logic for the Raven character.
    *
    * - Presents dialogue choices based on the player's selection.
    * - Guides the player toward discovering the path to the castle.
    * - Offers cryptic and lore-driven responses for immersion.
    * - Sets a flag (`SpokeToBird`) when key dialogue options are chosen.
    * - Provides an initial set of three dialogue options upon first interaction.
    *
    * Each choice leads to a different response, allowing the player to engage
    * with the Raven in a dynamic and interactive way.
    */
    public talk(choiceId?: number): ActionResult | undefined {
        if (choiceId === 1) {
            return new TalkActionResult (
                this,
                [
                    "Raven: A bold question! The path twists through the woods, where few dare tread.\n\n",
                    "But if you are seeking something grand, something… imposing—then you are on the right track.",
                ],
                [
                    new TalkChoice(4, "Something imposing? Be specific."),
                    new TalkChoice(5, "Never mind, I'll figure it out myself."),
                    new TalkChoice(6, "You enjoy being cryptic, don't you?"),
                ]
            );
        }
        else if (choiceId === 2) {
            return new TalkActionResult (
                this,
                [
                    "Raven: Who am I? Once, I had a name, a destination—like you.\n\n",
                    "But the road is cruel to those who stray too far. Some never find their way back.\n\n",
                    "Now, I linger where paths cross, where the lost hesitate. A guide, a whisper, a shadow on the road.\n\n",
                    "Call it a debt… or a fate worse than being forgotten.",
                ],
                [
                    new TalkChoice(1, "Where does this path lead?"),
                    new TalkChoice(3, "I have no time for riddles."),
                ]
            );
        }
        else if (choiceId === 3) {
            return new TextActionResult ([
                "Raven: Ah, impatience—so very human. But even ice must wait for the sun to melt it.\n\n",
                "Rushing blindly melts nothing… it only breaks.\n\n",
                "If you seek your path, traveler, then patience will serve you better than haste.",
            ]);
        }
        else if (choiceId === 5) {
            return new TextActionResult (
                [
                    "Ah, not satisfied with my riddles? Perhaps you're asking the wrong questions, little traveler.\n\n",
                    "Try again, approach differently, and maybe, just maybe, I'll give you the answer you seek.",
                ]
            );
        }
        else if (choiceId === 6) {
            return new TalkActionResult (
                this,
                [
                    "Raven: Oh, absolutely! What's the fun in handing out answers like stale breadcrumbs?\n\n",
                    "Mystery adds flavor to the journey, don't you think?\n\n",
                    "But fine, fine, since you insist—yes, the path leads somewhere important.\n\n",
                    "No, I won't spoil the surprise. Where's your sense of adventure?",
                ],
                [
                    new TalkChoice(4, "Something imposing? Be specific."),
                    new TalkChoice(5, "Never mind, I'll figure it out myself."),
                ]
            );
        }
        else if (choiceId === 4) {
            return new TalkActionResult (
                this,
                [
                    "Raven: Very well! Follow this path, and soon you shall stand before the castle gates.\n\n",
                    "Towering stone, heavy doors, and whispers of those who walked there before you.\n\n",
                    "If you have business within, step forward. If not… turn back before the walls see you first.",
                ],
                [
                    new TalkChoice(7, "A castle? That's exactly where I need to go!"),
                    new TalkChoice(8, "Sounds ominous… but I have no choice."),
                ]
            );
        }
        else if (choiceId === 7 || choiceId === 8) {
            // Sets Boolean on true when the player uses answer 7 or 8
            gameService.getPlayerSession().SpokeToBird = true;
            return new TextActionResult ([
                "Raven: Then your feet are set on the right path.\n\n",
                "The castle waits—but whether it welcomes or swallows you whole, that is yet to be seen.",
            ]);
        }

        // Shows a choice menu of 3 answers to choose from when the player starts talking to the bird
        return new TalkActionResult (
            this,
            [
                "Raven: Ah, a wanderer with questions. How delightful.\n\n",
                "Tell me, traveler, do you seek knowledge, direction, or simply a distraction?",
            ],
            [
                new TalkChoice(1, "Where does this path lead?"),
                new TalkChoice(2, "Who are you?"),
                new TalkChoice(3, "I have no time for riddles."),
            ]
        );
    }
}
