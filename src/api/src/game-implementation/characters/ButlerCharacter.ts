import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { TalkChoice } from "../../game-base/actions/TalkAction";
import { Character } from "../../game-base/gameObjects/Character";

export class ButlerCharacter extends Character implements Examine {
    public static readonly Alias: string = "butler";

    public constructor() {
        super(ButlerCharacter.Alias);
    }

    public name(): string {
        return "The Butler";
    }

    public talk(choiceId?: number): ActionResult | undefined {
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                [
                    "I am Edward.",
                    "I serve this castle.",
                ],
                [
                    new TalkChoice(4, "how long have you been here?"),
                    new TalkChoice(5, "Oke thanks for telling."),
                ]
            );
        }
        else if (choiceId === 2) {
            return new TalkActionResult(
                this,
                [
                    "You are in the old castle.",
                ],
                [
                    new TalkChoice(6, "How old is the castle?"),
                    new TalkChoice(7, "Oh oke."),
                ]
            );
        }

        else if (choiceId === 4) {
            return new TextActionResult (["So long i don't even remember. Sorry."]);
        }

        else if (choiceId === 6) {
            return new TextActionResult (["So as you can see it is in a really old state.",
                "But i would not remember how old exactly.",
            ]);
        }

        else if (choiceId === 5 || choiceId === 3 || choiceId === 7) {
            return new TextActionResult(["You walk away."]);
        }

        return new TalkActionResult(
            this,
            [
                "Hello, how are you doing?",
            ],
            [
                new TalkChoice(1, "Who are you?"),
                new TalkChoice(2, "Where am I?"),
                new TalkChoice(3, "never mind"),
            ]
        );
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It looks like a butler."]);
    }
}
