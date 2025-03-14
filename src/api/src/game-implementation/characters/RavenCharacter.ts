import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { TalkChoice } from "../../game-base/actions/TalkAction";
import { Character } from "../../game-base/gameObjects/Character";

export class RavenCharacter extends Character implements Examine {
    public static readonly Alias: string = " raven";

    public constructor() {
        super(RavenCharacter.Alias);
    }

    public name(): string {
        return "Raven";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The raven watches you with piercing eyes, as if waiting for you to make the next move. It seems to know more than it lets on."]);
    }

    public talk(choiceId?: number): ActionResult | undefined {
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                [
                    "Raven: At the gates of this cursed castle stands the Guard. He will not let you pass unless you prove your worth",
                ],
                [
                    new TalkChoice (3, "Prove my worth? How?"),
                    new TalkChoice (2, "Step away"),
                ]
            );
        }

        else if (choiceId === 2) {
            return new TextActionResult(["you walk away"]);
        }

        else if (choiceId === 3) {
            return new TalkActionResult(
                this,
                [
                    "Raven: He cares not for strength or wealth… only for wisdom. He will judge you on what you have uncovered within these walls.",
                ],
                [
                    new TalkChoice (4, "What kind of test?"),
                    new TalkChoice (2, "Step away"),
                ]

            );
        }

        else if (choiceId === 4) {
            return new TalkActionResult(
                this,
                [
                    "Raven: Questions, traveler. Questions about what you have seen, what you have heard, what you have done. Answer correctly, and the path to freedom will open.",
                ],
                [
                    new TalkChoice (5, "And if I fail?"),
                    new TalkChoice (2, "Step away"),
                ]
            );
        }

        else if (choiceId === 5) {
            return new TalkActionResult(
                this,
                [
                    "Raven: …Then you will remain here, trapped in these walls… forever.",
                ],
                [
                    new TalkChoice (6, "That can't be true"),
                    new TalkChoice (2, "Step away"),
                ]
            );
        }

        else if (choiceId === 6) {
            return new TextActionResult(["Raven: I do not deal in lies. Choose your answers wisely, traveler… for they will decide your fate"]);
        }

        return new TalkActionResult(
            this,
            [
                "Raven: Ah… You have come far, traveler. But your journey is not yet over. Go to the lobby, and there you will find your way to the Guard.",
            ],
            [
                new TalkChoice (1, "What do you mean?"),
                new TalkChoice (2, "step away"),

            ]
        );
    }
}
