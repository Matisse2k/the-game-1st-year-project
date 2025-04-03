import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { Simple, SimpleAction } from "../../game-base/actions/SimpleAction";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { Walk, WalkAction } from "../actions/WalkAction";
import { ButlerCharacter } from "../characters/ButlerCharacter";
import { TeddyBearItem } from "../items/TeddyBearItem";
import { UpperFloorRoom } from "./UpperFloor";
import { PlayerSession } from "../types";
import { BasementRoom } from "./BasementRoom";
import { CouchItem } from "../items/CouchItem";
import { CabinetItem } from "../items/CabinetItem";
import { TableItem } from "../items/TableItem";
import { SearchAction } from "../actions/SearchAction";
import { PickUpAction } from "../actions/PickUpActions";
import { KitchenRoom } from "./KitchenRoom";
import { GuardQuizRoom } from "./GuardQuizRoom";
import { SwitchPageActionResult } from "../actionResults/SwitchPageActionResult";

export class LobbyRoom extends Room implements Simple, Walk, Simple {
    public static readonly Alias: string = "lobby";

    public constructor() {
        super(LobbyRoom.Alias);
    }

    public name(): string {
        return "Lobby";
    }

    public images(): string[] {
        return ["donkereLobby", "layers/Butler"];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        const objects: GameObject[] = [];

        if (!playerSession.FirstTimeButler && !playerSession.inventory.includes("ground floor map")) {
            return [
                new ButlerCharacter(),
            ];
        }

        else if (playerSession.FirstTimeButler && !playerSession.inventory.includes("ground floor map")) {
            return [
                new ButlerCharacter(),
            ];
        }

        else if (!playerSession.FirstTimeButler && playerSession.inventory.includes("ground floor map")) {
            return [
                new ButlerCharacter(),
            ];
        }

        objects.push(
            new KitchenRoom(),
            new UpperFloorRoom(),
            new BasementRoom(),
            new ButlerCharacter(),
            new CouchItem(),
            new CabinetItem(),
            new TableItem(),
            new GuardQuizRoom()
        );

        // Voeg de teddybeer alleen toe als deze is gevonden
        if (playerSession.TeddyBearFound && !playerSession.pickedupTeddyBear) {
            objects.push(new TeddyBearItem());
        }

        return objects;
    }

    /**
     * @inheritdoc
     */
    public actions(): Action[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.confirmingWalkToGuardQuiz) {
            return [
                new SimpleAction("walk-to-guard-quiz", "Yes, I want to go to the guard quiz!"),
                new SimpleAction("cancel-walk-to-guard-quiz", "Nevermind, I will learn more first."),
            ];
        }

        // Show only Examine and Talk actions if this is first butler interaction
        if (!playerSession.FirstTimeButler && !playerSession.inventory.includes("ground floor map")) {
            return [
                new ExamineAction(),
                new TalkAction(),
            ];
        }

        else if (playerSession.FirstTimeButler && !playerSession.inventory.includes("ground floor map")) {
            return [
                new ExamineAction(),
                new TalkAction(),
            ];
        }

        else if (!playerSession.FirstTimeButler && playerSession.inventory.includes("ground floor map")) {
            return [
                new ExamineAction(),
                new TalkAction(),
            ];
        }

        return [
            new ExamineAction(),
            new TalkAction(),
            new WalkAction(),
            new SearchAction(),
            new PickUpAction(),
        ];
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.currentRoom !== LobbyRoom.Alias) {
            return undefined;
        }

        return new TextActionResult([
            "The door shuts behind you as you enter the lobby. You try to open the door again, but it's locked.",
        ]);
    }

    public simple(alias: string): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (alias === "walk-to-guard-quiz") {
            playerSession.confirmingWalkToGuardQuiz = false;
            const targetRoom: Room = new GuardQuizRoom();

            try {
                playerSession.currentRoom = targetRoom.alias;
                return targetRoom.examine();
            }
            catch (error) {
                console.error("🔥 Fout bij het wisselen van kamer:", error);
                return new TextActionResult(["❌ Er ging iets mis bij het lopen!"]);
            }
        }

        if (alias === "cancel-walk-to-guard-quiz") {
            playerSession.confirmingWalkToGuardQuiz = false;
            return new TextActionResult(["You decided to explore more of the castle first."]);
        }

        if (alias === "show-map") {
            console.log("🗺️ Navigating to Plattegrond page..."); // Debugging log
            if (playerSession.inventory.includes("ground floor map")) {
                return new SwitchPageActionResult("plattegrond");
            }
            else {
                return new TextActionResult(["You don't have a map yet. Try to find one first!"]);
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

    public walk(alias: string, gameObjects: GameObject[]): ActionResult {
        const getPlayerSession: PlayerSession = gameService.getPlayerSession();

        console.log("🚀 WalkAction executed!");
        console.log("👉 Alias ontvangen:", alias);
        console.log("🎭 GameObjects ontvangen:", gameObjects.map(obj => obj.name()));

        if (gameObjects.length === 0) {
            return new TextActionResult(["❌ No objects selected to walk to!"]);
        }

        // hier kijkt hij wat de gameobject is van de kamer.
        const targetRoom: Room | undefined = gameObjects.find(obj => obj instanceof Room);

        // Als er geen kamer kan worden gevonden om naar toe te lopen is dit het resultaat
        if (!targetRoom) {
            console.error("❌ Geen geldige kamer gevonden!");
            return new TextActionResult(["❌ You can't walk to that!"]);
        }

        try {
            getPlayerSession.BovenOfBeneden = false;
            gameService.getPlayerSession().currentRoom = targetRoom.alias;
            console.log(`✅ Huidige kamer is nu: ${getPlayerSession.currentRoom}`);
            return new TextActionResult([`✅ You walked to the ${targetRoom.alias}!`]);
        }
        catch (error) {
            console.error("🔥 Fout bij het wisselen van kamer:", error);
            return new TextActionResult(["❌ Er ging iets mis bij het lopen!"]);
        }
    }
}
