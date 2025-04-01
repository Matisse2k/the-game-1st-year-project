import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { TalkChoice } from "../../game-base/actions/TalkAction";
import { Character } from "../../game-base/gameObjects/Character";
import { gameService } from "../../global";
import { GroundFloorMap } from "../items/GroundFloorMapItem";
import { PlayerSession } from "../types";

/**
 * Represents the Butler character in the game.
 */
export class ButlerCharacter extends Character implements Examine {
    /**
     * The alias for the Butler character.
     */
    public static readonly Alias: string = "butler";

    /**
     * Constructs a new ButlerCharacter.
     */
    public constructor() {
        super(ButlerCharacter.Alias);
    }

    /**
     * Returns the name of the character.
     * @returns {string} The name of the character.
     */
    public name(): string {
        return "The Butler";
    }

    /**
     * Handles the talk action for the character.
     * @param choiceId The ID of the talk choice.
     * @returns {ActionResult | undefined} The result of the talk action.
     */
    public talk(choiceId?: number): ActionResult | undefined {
        const PlayerSession: PlayerSession = gameService.getPlayerSession();
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                [
                    "I am Edward Blackwood, the head butler of this estate.\n\n",
                    "I have been serving here for generations, maintaining the castle's legacy and traditions.\n\n",
                    "The Blackwood family has been loyal to this estate for at least six generations.\n\n",
                    "I manage the staff, coordinate meals, and ensure the security of the grounds.",
                ],
                [
                    new TalkChoice(4, "How long have you been here?"),
                    new TalkChoice(5, "Thank you for telling me."),
                ]
            );
        }
        else if (choiceId === 2) {
            if (!PlayerSession.GotCastleMap) {
                PlayerSession.GotCastleMap = true;
                PlayerSession.inventory.push(GroundFloorMap.Alias);
                return new TalkActionResult(
                    this,
                    [
                        "You are in Raven's Keep, one of the oldest standing castles in the region.\n",
                        "This fortress has stood for over five centuries, weathering wars, plagues, and numerous supernatural occurrences.\n\n",
                        "Here, take this map. It might help you navigate the castle grounds.\n\n",
                        "You received a castle map and it was added to your inventory.",
                    ],
                    [
                        new TalkChoice(6, "Tell me more about the castle"),
                        new TalkChoice(7, "Thank you for the map."),
                    ]
                );
            }
            else {
                return new TalkActionResult(
                    this,
                    [
                        "You are in Raven's Keep, one of the oldest standing castles in the region.\n",
                        "This fortress has stood for over five centuries, weathering wars, plagues, and numerous supernatural occurrences.\n\n",
                        "I see you already have the map I provided earlier. I hope it's been useful.",
                    ],
                    [
                        new TalkChoice(6, "Tell me more about the castle"),
                        new TalkChoice(7, "Thank you for the information."),
                    ]
                );
            }
        }
        else if (choiceId === 4) {
            PlayerSession.FirstTimeButler = true;
            return new TalkActionResult(
                this,
                [
                    "I've served in this castle for over forty years, following in my father's footsteps, who served before me, and his father before him.\n\n",
                    "Sometimes I feel the very walls have absorbed our essence... our dedication to this place.\n\n",
                    "There are certain rooms I avoid after midnight. The portrait gallery, for instance...\n",
                    "The paintings' eyes seem to follow you, and sometimes I can hear strange whispers.",
                ],
                [
                    new TalkChoice(3, "Let me ask you something else."),
                    new TalkChoice(5, "That sounds eerie."),
                ]
            );
        }
        else if (choiceId === 6) {
            return new TalkActionResult(
                this,
                [
                    "The original structures of Raven's Keep date back to 1487.\n\n",
                    "This castle has been the site of many unusual events over the centuries.\n",
                    "There are reports of ghostly apparitions, unexplained sounds, and objects moving on their own.\n\n",
                    "The east wing was added in the 16th century, while the west wing was reconstructed after a fire in the late 1700s.\n",
                    "If these walls could speak, they would tell tales spanning half a millennium.",
                ],
                [
                    new TalkChoice(3, "Let me ask you something else."),
                    new TalkChoice(5, "Fascinating history."),
                ]
            );
        }
        else if (choiceId === 5 || choiceId === 3 || choiceId === 7) {
            return new TextActionResult(["You step back, concluding the conversation for now."]);
        }

        else if (choiceId === 8) {
            return new TalkActionResult(
                this,
                [
                    "Butler: Oh but, I cannot allow you to go upstairs without permission.",
                ],
                [
                    new TalkChoice(9, "I got the ghost's permission."),

                ]
            );
        }

        else if (choiceId === 9) {
            return new TalkActionResult(
                this,
                [
                    "Butler: Dear ghost is that true?\n\n",

                    "Ghost: Yes, I have given him permission to go upstairs. He is a friend of mine.\n\n",

                    "Butler: Very well then, but one person's permission is not enough to go upstairs.",
                ],
                [
                    new TalkChoice(10, "I also got the chef's permission."),
                ]
            );
        }

        else if (choiceId === 10) {
            PlayerSession.butlerspermission = true;
            return new TextActionResult([
                "Butler: Oh wow you convinced the chef? Gustavo, is he speaking the truth?\n\n",

                "Chef: Yes, that is indeed true. He knows how to cook.\n\n",

                "Butler: Very well then, you may go upstairs. But be careful, the upper floor is not a place for the faint-hearted.",
            ]);
        }

        else if (choiceId === 11) {
            PlayerSession.inventory = PlayerSession.inventory.filter(item => item !== "Serving platter");
            PlayerSession.butlerHint = true;
            return new TextActionResult([
                "Butler: Ah, the serving platter! I lost it. Thank you for returning it.\n\n",

                "Now I can serve the guests properly again.\n\n",

                "As a token of my gratitude, I will give you a small reward.\n\n",

                "Some information about the quiz: One of the questions asks what the first sentence is that he says to you in the room.\n\n",
            ]);
        }

        else if (choiceId === 12) {
            return new TextActionResult([
                "Butler: One of the questions he asks is what the first sentence is that he says to you in the room.\n\n",
            ]);
        }

        return new TalkActionResult(
            this,
            [
                "Good day to you. I am the butler of this castle.",
                "Welcome to our humble abode. Though unexpected, your presence is not unwelcome.",
                "How may I be of service to you today?",
            ],
            [
                new TalkChoice(1, "Who are you?"),
                new TalkChoice(2, "Where am I?"),
                new TalkChoice(3, "Never mind"),
                ...(!PlayerSession.butlerspermission && PlayerSession.GhostQuestCompleted && PlayerSession.ChefQuestCompleted ? [new TalkChoice(8, "Can i go upstairs now?")] : []),
                ...(PlayerSession.inventory.includes("Serving platter") ? [new TalkChoice(11, "Is this Serving platter yours?")] : []),
                ...(PlayerSession.butlerHint ? [new TalkChoice(12, "What was the hint again?")] : []),
            ]
        );
    }

    /**
     * Examines the character.
     * @returns {ActionResult | undefined} The result of examining the character.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "A tall, distinguished gentleman with silver hair and impeccable posture.\n\n",
            "He wears a perfectly tailored black suit with a crisp white shirt.\n\n",
            "His expression is formal but not unfriendly, suggesting years of professional service.\n\n",
            "Despite his apparent age, he moves with precision and grace.",
        ]);
    }
}
