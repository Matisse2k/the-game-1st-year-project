import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { TalkChoice } from "../../game-base/actions/TalkAction";
import { Character } from "../../game-base/gameObjects/Character";
import { gameService } from "../../global";
import { PlayerSession } from "../types";

export class GuardCharacter extends Character {
    public static readonly Alias: string = "Guard";

    /**
     * Constructs a new GhostCharacter instance.
     */
    public constructor() {
        super(GuardCharacter.Alias);
    }

    /**
     * Returns the name of the character.
     * @returns {string} The name of the character.
     */
    public name(): string {
        return "Guard";
    }

    /**
     * Handles the talk action for the GuardCharacter.
     * @param {number} [choiceId] - The ID of the chosen dialogue option.
     * @returns {ActionResult | undefined} The result of the talk action.
     */
    public talk(choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (!playerSession.incorrectAnswers) {
            playerSession.incorrectAnswers = 0;
        }

        if (choiceId === 1) {
            playerSession.incorrectAnswers = 0; // Reset incorrect answers at the start of the quiz
            return new TalkActionResult(
                this,
                [
                    "Welcome to the quiz! Answer these questions correctly to proceed.",
                    "First question: What was the first message the raven gave you when you entered the forest?",
                ],
                [
                    new TalkChoice(2, "The castle is your only way out."),
                    new TalkChoice(3, "Be wary of the ghost."),
                    new TalkChoice(4, "There is no hope in this castle."),
                ]
            );
        }
        else if (choiceId === 2) {
            return new TalkActionResult(
                this,
                [
                    "Correct! Next question: Where did you find the knife that you needed to give to the chef?",
                ],
                [
                    new TalkChoice(5, "In the basement."),
                    new TalkChoice(6, "In the attic."),
                    new TalkChoice(7, "In the kitchen."),
                ]
            );
        }
        else if (choiceId === 3 || choiceId === 4) {
            playerSession.incorrectAnswers++;
            return new TalkActionResult(
                this,
                [
                    "Incorrect. Try again.",
                    "Next question: Where did you find the knife that you needed to give to the chef?",
                ],
                [
                    new TalkChoice(5, "In the basement."),
                    new TalkChoice(6, "In the attic."),
                    new TalkChoice(7, "In the kitchen."),
                ]
            );
        }
        else if (choiceId === 5) {
            return new TalkActionResult(
                this,
                [
                    "Correct! Next question: What did the ghost in the basement ask you for in order to grant you access to the first floor?",
                ],
                [
                    new TalkChoice(8, "A toy."),
                    new TalkChoice(9, "A picture."),
                    new TalkChoice(10, "A key."),
                ]
            );
        }
        else if (choiceId === 6 || choiceId === 7) {
            playerSession.incorrectAnswers++;
            return new TalkActionResult(
                this,
                [
                    "Incorrect. Try again.",
                    "Next question: What did the ghost in the basement ask you for in order to grant you access to the first floor?",
                ],
                [
                    new TalkChoice(8, "A toy."),
                    new TalkChoice(9, "A picture."),
                    new TalkChoice(10, "A key."),
                ]
            );
        }
        else if (choiceId === 8) {
            return new TalkActionResult(
                this,
                [
                    "Correct! Next question: What was the last choice you had to make in order to leave the castle?",
                ],
                [
                    new TalkChoice(11, "Answer my questions correctly."),
                    new TalkChoice(12, "Choose the right room on the first floor."),
                    new TalkChoice(13, "Talk to the ghost in the attic."),
                ]
            );
        }
        else if (choiceId === 9 || choiceId === 10) {
            playerSession.incorrectAnswers++;
            return new TalkActionResult(
                this,
                [
                    "Incorrect. Try again.",
                    "Next question: What was the last choice you had to make in order to leave the castle?",
                ],
                [
                    new TalkChoice(11, "Answer my questions correctly."),
                    new TalkChoice(12, "Choose the right room on the first floor."),
                    new TalkChoice(13, "Talk to the ghost in the attic."),
                ]
            );
        }
        else if (choiceId === 11) {
            return new TalkActionResult(
                this,
                [
                    "Correct! Next question: Who gave you the map of the castle?",
                ],
                [
                    new TalkChoice(14, "The butler."),
                    new TalkChoice(15, "The chef."),
                    new TalkChoice(16, "The ghost."),
                ]
            );
        }
        else if (choiceId === 12 || choiceId === 13) {
            playerSession.incorrectAnswers++;
            return new TalkActionResult(
                this,
                [
                    "Incorrect. Try again.",
                    "Next question: Who gave you the map of the castle?",
                ],
                [
                    new TalkChoice(14, "The butler."),
                    new TalkChoice(15, "The chef."),
                    new TalkChoice(16, "The ghost."),
                ]
            );
        }
        else if (choiceId === 14) {
            return new TalkActionResult(
                this,
                [
                    "Correct! Next question: Why did you need the knife for the chef?",
                ],
                [
                    new TalkChoice(17, "To access a secret room."),
                    new TalkChoice(18, "To trade for information about the toy."),
                    new TalkChoice(19, "To obtain a new item."),
                ]
            );
        }
        else if (choiceId === 15 || choiceId === 16) {
            playerSession.incorrectAnswers++;
            return new TalkActionResult(
                this,
                [
                    "Incorrect. Try again.",
                    "Next question: Why did you need the knife for the chef?",
                ],
                [
                    new TalkChoice(17, "To access a secret room."),
                    new TalkChoice(18, "To trade for information about the toy."),
                    new TalkChoice(19, "To obtain a new item."),
                ]
            );
        }

        else if (choiceId === 17 || choiceId === 19) {
            playerSession.incorrectAnswers++;
            return new TalkActionResult(
                this,
                [
                    "Incorrect. Try again.",
                    "Next question: Final question: Why is the ghost bound to the mansion?",
                ],
                [
                    new TalkChoice(20, "Because of a curse."),
                    new TalkChoice(21, "Because of a love story."),
                    new TalkChoice(22, "Because of a treasure."),
                ]
            );
        }

        else if (choiceId === 18) {
            return new TalkActionResult(
                this,
                [
                    "Correct! Final question: Why is the ghost bound to the mansion?",
                ],
                [
                    new TalkChoice(20, "Because of a curse."),
                    new TalkChoice(21, "Because of a love story."),
                    new TalkChoice(22, "Because of a treasure."),
                ]
            );
        }
        else if (choiceId === 21 || choiceId === 22) {
            playerSession.incorrectAnswers++;
            return this.endQuiz(playerSession);
        }
        else if (choiceId === 20) {
            return this.endQuiz(playerSession);
        }
        return new TalkActionResult(
            this,
            [
                "Ah, there we have another person daring to take the quiz.",
            ],
            [
                new TalkChoice(1, "Start the quiz."),
            ]
        );
    }

    private endQuiz(playerSession: PlayerSession): ActionResult {
        if (playerSession.incorrectAnswers > 2) {
            playerSession.quizFailed = true;
            return new TextActionResult([
                `You have given ${playerSession.incorrectAnswers} incorrect answers out of 7.`,
                "You have exceeded the maximum number of incorrect answers. You are now forever trapped in the castle.",
            ]);
        }
        playerSession.quizCompleted = true;
        return new TextActionResult([
            `You have given ${playerSession.incorrectAnswers} incorrect answers out of 7.`,
            "Congratulations! You have completed the quiz. You may proceed.",
        ]);
    }
}
