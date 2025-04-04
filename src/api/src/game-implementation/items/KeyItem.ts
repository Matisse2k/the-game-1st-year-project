import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { SoundActionResult } from "../../game-base/actionResults/SoundActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { PickUp } from "../actions/PickUpActions";
import { Use } from "../actions/UseItemAction";
import { PlayerSession } from "../types";

/**
 * KeyItem class represents a key in the game.
 */
export class KeyItem extends Item implements PickUp, Use {
    public static readonly Alias: string = "key";

    /**
     * Constructor for the KeyItem class.
     */
    public constructor() {
        super(KeyItem.Alias);
    }

    /**
 * Attempts to pick up the key item.
 *
 * - The player can only pick up the key if they have previously looked under the stone (`lookedUnderStone3`).
 * - If the condition is met, the key is marked as found (`keyFound = true`) and its alias is returned.
 * - If the player has not looked under the stone, the function returns `undefined`, meaning the key cannot be picked up.
 *
 * @returns {string | undefined} The alias of the key item if successfully picked up, otherwise `undefined`.
 */
    public pickUp(): string | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.lookedUnderStone3) {
            playerSession.keyFound = true;
            return KeyItem.Alias;
        }
        else {
            return undefined;
        }
    }

    public use(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        // Check if the door is already opened
        if (playerSession.CastleEnteranceDoorOpened) {
            return new TextActionResult(["The door is already open."]);
        }

        // Remove the key from the inventory
        playerSession.inventory = playerSession.inventory.filter((item: string) => item !== "key");

        // Set CastleEnteranceDoorOpened to true
        playerSession.CastleEnteranceDoorOpened = true;

        // Return both the text result and the sound result
        return [
            new TextActionResult([
                "You use the key to unlock the door. As the heavy castle door creaks open, a blinding beam of golden light spills out, piercing through the cold darkness. The warmth of the unknown beckons, casting long shadows on the stone path behind you. What secrets lie beyond this threshold?",
            ]),
            new SoundActionResult("sounds/SoundCheck.mp3"), // Path to the door opening sound
        ];
    }

    /**
     * Returns the name of the item.
     * @returns {string} The name of the item.
     */
    public name(): string {
        return "Key";
    }

    /**
     * Examines the key and returns a description.
     * @returns {ActionResult | undefined} The result of the examination.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This is an old rusty key. It might be useful later.",
        ]);
    }

    /**
     * Returns the description of the key.
     * @returns {string} The description of the key.
     */
    public getDescription(): string {
        return "A small, rusty key.";
    }
}
