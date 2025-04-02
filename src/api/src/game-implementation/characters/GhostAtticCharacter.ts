import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Simple } from "../../game-base/actions/SimpleAction";
import { TalkChoice } from "../../game-base/actions/TalkAction";
import { Character } from "../../game-base/gameObjects/Character";
import { gameService } from "../../global";
import { GhostEndingRoom } from "../rooms/GhostEndingRoom";
import { PlayerSession } from "../types";

/**
 * Represents the GhostCharacter in the game.
 */
export class GhostAtticCharacter extends Character implements Simple, Examine {
    public static readonly Alias: string = "ghostAttic";

    public constructor() {
        super(GhostAtticCharacter.Alias);
    }

    public simple(_alias: string): ActionResult | undefined {
        return undefined;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is the ghost of the basement.\nWhat is he doing here?"]);
    }

    public name(): string {
        return "Ghost";
    }

    public talk(choiceId?: number): ActionResult | undefined {
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                [
                    "There is something I want to show you,\n" +
                    "but you must accept the fate that comes with it",
                ],
                [
                    new TalkChoice(3, "Accept Fate"),
                    new TalkChoice(4, "*walk away*"),
                ]
            );
        }

        if (choiceId === 3) {
            // Transition to the GhostEndingRoom
            const playerSession: PlayerSession = gameService.getPlayerSession();
            playerSession.currentRoom = GhostEndingRoom.Alias; // Switch to the GhostEndingRoom

            // Transition to the GhostEndingRoom
            return new TextActionResult([
                "You feel a strange sensation as the ghost reveals the truth.\n\n" +
                "You are now one of us, a ghost bound to this attic forever.\n\n" +
                "Looking around, you see countless other ghosts who share your fate.\n\n" +
                "As you watch, the next player enters the castle, unaware of their destiny.\n" +
                "You are transported to the ghost realm...",
            ]);
        }

        if (choiceId === 2 || choiceId === 4) {
            return new TextActionResult(["*You walk away*"]);
        }

        return new TalkActionResult(
            this,
            ["I did not think you would find this room"],
            [
                new TalkChoice(1, "Why are you in this room"),
                new TalkChoice(2, "*walk away*"),
            ]
        );
    }
}
