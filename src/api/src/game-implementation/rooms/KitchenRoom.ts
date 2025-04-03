import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { Simple } from "../../game-base/actions/SimpleAction";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { SwitchPageActionResult } from "../actionResults/SwitchPageActionResult";
import { GiveAction } from "../actions/GiveAction";
import { InspectAction } from "../actions/InspectAction";
import { PickUpAction } from "../actions/PickUpActions";
import { Walk, WalkAction } from "../actions/WalkAction";
import { ChefCharacter } from "../characters/ChefCharacter";
import { KnifeItem } from "../items/KnifeItem";
import { MysteriousHookItem } from "../items/MysteriousHookItem";
import { MysteriousPaperItem } from "../items/MysteriousPaperItem";
import { PlayerSession } from "../types";
import { LobbyRoom } from "./LobbyRoom";

export class KitchenRoom extends Room implements Walk, Simple {
    public static readonly Alias: string = "KitchenRoom";
    public constructor() {
        super(KitchenRoom.Alias);
    }

    public simple(alias: string): ActionResult | undefined {
        if (alias === "show-map") {
            console.log("🗺️ Navigating to Plattegrond page..."); // Debugging log
            try {
                return new SwitchPageActionResult("plattegrond");
            }
            catch (error) {
                console.error("🔥 Fout bij het wisselen naar plattegrond:", error);
                return new TextActionResult(["❌ Er ging iets mis bij het tonen van de kaart!"]);
            }
        }

        if (alias === "open-notebook") {
            console.log("📔 Navigating to Notebook page..."); // Debugging log
            try {
                return new SwitchPageActionResult("notebook");
            }
            catch (error) {
                console.error("🔥 Fout bij het wisselen naar notebook:", error);
                return new TextActionResult(["❌ Er ging iets mis bij het openen van het notitieboek!"]);
            }
        }

        if (alias === "open-menu") {
            try {
                return new SwitchPageActionResult("achievementmenu");
            }
            catch (error) {
                console.error("🔥 Fout bij het wisselen naar het achievement", error);
            }
        }

        return undefined;
    }

    public name(): string {
        return "Kitchen";
    }

    public actions(): Action[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        const actions: Action[] = [
            new ExamineAction(),
            new TalkAction(),
            new WalkAction(),
            new InspectAction(),
            new PickUpAction(),
        ];
        if (playerSession.ChefQuestStarted) {
            actions.push(new GiveAction());
        }
        return actions;
    }

    public images(): string[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.inventory.includes("Mysterious Hook") && !playerSession.ChefQuestCompleted) {
            return ["KitchenGeenMes"];
        }

        if (playerSession.ChefQuestCompleted && !playerSession.inventory.includes("Mysterious Hook")) {
            return ["layers/KitchenMetMes", "layers/HaakKitchenInPlace"];
        }

        if (playerSession.ChefQuestCompleted && playerSession.inventory.includes("Mysterious Hook")) {
            return ["layers/KitchenMetMes"];
        }

        return ["KitchenGeenMes", "layers/HaakKitchenInPlace"];
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.currentRoom !== KitchenRoom.Alias) {
            return undefined;
        }

        return new TextActionResult (["working"]);
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        const objects: GameObject[] = [
            new LobbyRoom(),
            new ChefCharacter(),
        ];

        if (!playerSession.inventory.includes("Mysterious Hook")) {
            objects.push(new MysteriousHookItem());
        }

        if (playerSession.inventory.includes("knife")) {
            objects.push(new KnifeItem());
        }
        if (playerSession.inventory.includes("Mysterious paper")) {
            objects.push(new MysteriousPaperItem());
        }
        return objects;
    }

    /**
         * Handles the walk action in the room.
         * @param {string} _alias - The alias of the target object.
         * @param {GameObject[]} gameObjects - The game objects to walk to.
         * @returns {ActionResult} The result of the walk action.
         */
    public walk(_alias: string, gameObjects: GameObject[]): ActionResult {
        const PlayerSession: PlayerSession = gameService.getPlayerSession();

        const targetRoom: Room | undefined = gameObjects.find(obj => obj instanceof Room);

        // Als er geen kamer kan worden gevonden om naar toe te lopen is dit het resultaat
        if (!targetRoom) {
            console.error("❌ Geen geldige kamer gevonden!");
            return new TextActionResult(["❌ You can't walk to that!"]);
        }

        // Update the player's current room to the target room
        PlayerSession.currentRoom = targetRoom.alias;
        // Call the examine method of the target room
        return targetRoom.examine() || new TextActionResult([`✅ You walked to the ${targetRoom.alias}!`]);
    }
}
