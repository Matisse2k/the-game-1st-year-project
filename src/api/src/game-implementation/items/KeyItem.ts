import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { Use } from "../actions/UseItemAction";
import { PlayerSession } from "../types";

/**
 * KeyItem class represents a key in the game.
 */
export class KeyItem extends Item implements Use {
    public static readonly Alias: string = "key";

    /**
     * Constructor for the KeyItem class.
     */
    public constructor() {
        super(KeyItem.Alias);
    }

    public use(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        // Check if the door is already opened
        if (playerSession.CastleEnteranceDoorOpened) {
            return new TextActionResult(["The door is already open."]);
        }

        // Remove the key from the inventory
        const index: number = playerSession.inventory.indexOf(KeyItem.Alias);
        if (index > -1) {
            playerSession.inventory.splice(index, 1);
        }

        // Set CastleEnteranceDoorOpened to true
        playerSession.CastleEnteranceDoorOpened = true;

        // TODO: ask about audio implementation

        /*
        const doorOpenSound: HTMLAudioElement = document.getElementById("castleEntranceDoorOpenSound") as HTMLAudioElement;
        doorOpenSound.play().catch((error: unknown) => {
            console.error("Error playing door open sound:", error);
        }); */

        return new TextActionResult(["You use the key to unlock the door. As the heavy castle door creaks open, a blinding beam of golden light spills out, piercing through the cold darkness. The warmth of the unknown beckons, casting long shadows on the stone path behind you. What secrets lie beyond this threshold?"]);
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
}
