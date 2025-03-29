import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { TalkChoice } from "../../game-base/actions/TalkAction";
import { Character } from "../../game-base/gameObjects/Character";
import { gameService } from "../../global";
import { PlayerSession } from "../types";

export class BirdCharachter extends Character implements Examine {
    public static readonly Alias: string = "BirdCharacter";

    public constructor() {
        super(BirdCharachter.Alias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["I have seen this bird on the way to the castle"]);
    }

    public name(): string {
        return "Bird";
    }

    public talk(choiceId?: number): ActionResult | undefined {
        const PlayerSession: PlayerSession = gameService.getPlayerSession();
        if (choiceId === 1) {
            return new TalkActionResult(
                this,

                ["You came uninvited in the castle, which means you are here for answers.\n",
                    "And because you want answers they want answers."],

                [
                    new TalkChoice (4, "what do you mean with they want answers?"),
                    new TalkChoice (5, "This is a big mistake. I just want to leave this place."),
                    new TalkChoice (6, "You are not making sense, I'll handle this myself"),
                ]
            );
        }

        else if (choiceId === 2) {
            return new TalkActionResult(
                this,

                ["You should ask the right questions, so you can give the right answers."],

                [
                    new TalkChoice (7, "what do you mean with the right answers?"),
                    new TalkChoice (8, "You are not helping, just go away"),
                ]
            );
        }
        else if (choiceId === 4 || choiceId === 7) {
            return new TalkActionResult(
                this,

                ["This castle has a big story.\n",
                    "If you shall answer the questions right, they will let you go.\n",
                    "If not then......"],

                [
                    new TalkChoice (9, "Then what will happen ??"),
                    new TalkChoice (10, "how can I answer the questions right ??"),
                    new TalkChoice (11, "I'll figure this out myself"),
                ]
            );
        }

        else if (choiceId === 5) {
            return new TalkActionResult(
                this,

                ["If you want to leave the castle you should answer the questions right.\n",
                    "If not then......"],

                [
                    new TalkChoice (12, "Then what will happen ??"),
                    new TalkChoice (13, "how can I get the right answers ??"),
                    new TalkChoice (14, "You are not helping, just go away"),
                ]
            );
        }

        else if (choiceId === 10 || choiceId === 13) {
            PlayerSession.TalkedToBird = true;
            return new TalkActionResult(
                this,

                ["That is for you to figure out.\n",
                    "Maybe some people you met earlier can help you"],

                [
                    new TalkChoice (15, "I will escape this place!"),
                ]
            );
        }

        else if (choiceId === 9 || choiceId === 12) {
            PlayerSession.TalkedToBird = true;
            return new TalkActionResult(
                this,

                ["I hope you'll never find out"],

                [
                    new TalkChoice (16, "....."),
                ]
            );
        }
        else if (choiceId === 3 || choiceId === 6 || choiceId === 8 || choiceId === 11 || choiceId === 14 || choiceId === 15 || choiceId === 16) {
            return new TextActionResult(["*You walk away*"]);
        }

        return new TalkActionResult(
            this,

            ["Good to see you back.\n",
                "I bet you have some questions"],

            [
                new TalkChoice(1, "Why are they keeping me trapped here ?"),
                new TalkChoice(2, "How did you enter the castle ?"),
                new TalkChoice(3, "I don't have anything to ask you."),
            ]
        );
    }
}
