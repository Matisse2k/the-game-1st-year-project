import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { Simple, SimpleAction } from "../../game-base/actions/SimpleAction";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { Walk, WalkAction } from "../actions/WalkAction";
import { GuardCharacter } from "../characters/GuardCharacter";
import { PlayerSession } from "../types";
import { GameOverRoom } from "./GameOverRoom";
import { GoodEndingRoom } from "./GoodEndingRoom";
import { LobbyRoom } from "./LobbyRoom";

export class GuardQuizRoom extends Room implements Simple, Walk {
    public static readonly Alias: string = "GuardQuiz";

    /**
     * Constructs a new PathToTheCastleRoom instance.
     */
    public constructor() {
        super(GuardQuizRoom.Alias);
    }

    /**
     * Returns the name of the room.
     * @returns {string} The name of the room.
     */
    public name(): string {
        return "Quiz Room";
    }

    public images(): string[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.quizCompleted) {
            return ["QuizRoom"];
        }
        else {
            return ["QuizRoom", "layers/GuardLayer"];
        }
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You are in the Quiz Room.",
        ]);
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.quizCompleted) {
            return [
                new LobbyRoom(), // TODO: place exit room
                new GoodEndingRoom(),
            ];
        }
        else if (playerSession.quizFailed) {
            return [];
        }
        else {
            return [
                new GuardCharacter(),
            ];
        }
    }

    /**
     * Returns the actions available in the room.
     * @returns {Action[]} An array of actions.
     */
    public actions(): Action[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.quizCompleted) {
            return [
                new WalkAction(),
            ];
        }
        else if (playerSession.quizFailed) {
            return [new SimpleAction("quit", "Quit")];
        }
        else {
            return [
                new TalkAction(),
            ];
        }
    }

    public simple(alias: string): ActionResult | undefined {
        if (alias === "quit") {
            // TODO: plaats hier de class naam van de kamer waar je heen wilt gaan nadat je op start hebt gedrukt.
            const room: Room = new GameOverRoom();

            // Set the current room to the startup room
            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }

    /**
     * Handles the game over cutscene.
     */
    public gameOver(): void {
        setTimeout(() => {
            // gameService.goToStartScreen();
        }, 5000); // Wait for 5 seconds before going to the start screen
    }

    public walk(_alias: string, gameObjects: GameObject[]): ActionResult {
        const PlayerSession: PlayerSession = gameService.getPlayerSession();

        // hier kijkt hij wat de gameobject is van de kamer.
        const targetRoom: Room | undefined = gameObjects.find(obj => obj instanceof Room);

        // Als er geen kamer kan worden gevonden om naar toe te lopen is dit het resultaat
        if (!targetRoom) {
            console.error("❌ Geen geldige kamer gevonden!");
            return new TextActionResult(["❌ You can't walk to that!"]);
        }

        if (targetRoom.alias === GuardQuizRoom.Alias) {
            PlayerSession.confirmingWalkToGuardQuiz = true;
            return new TextActionResult(["Are you sure you want to walk to the Quiz Room? There is no way back!"]);
        }

        // Update the player's current room to the target room
        PlayerSession.currentRoom = targetRoom.alias;
        // Call the examine method of the target room
        return targetRoom.examine() || new TextActionResult([`✅ You walked to the ${targetRoom.alias}!`]);
    }
}
