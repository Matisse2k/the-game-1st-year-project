import { BaseGameService } from "../../game-base/services/BaseGameService";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { StartupRoom } from "../rooms/StartupRoom";
import { PlayerSession } from "../types";
import { LobbyRoom } from "../rooms/LobbyRoom";
import { TeddyBearItem } from "../items/TeddyBearItem";
import { WalkAction } from "../actions/WalkAction";
import { ButlerCharacter } from "../characters/ButlerCharacter";
import { PathToTheCastleRoom } from "../rooms/PathToTheCastleRoom";
import { StonesItem } from "../items/StonesItem";
import { KeyItem } from "../items/KeyItem";
import { SearchAction } from "../actions/SearchAction";
import { Stone1Item } from "../items/Stone1Item";
import { Stone2Item } from "../items/Stone2Item";
import { Stone3Item } from "../items/Stone3Item";
import { Stone4Item } from "../items/Stone4Item";
import { CastleDoorEnteranceRoom } from "../rooms/CastleDoorEnteranceRoom";
import { CastleEnteranceDoorItem } from "../items/CastleEnteranceDoorItem";
import { UseItemAction } from "../actions/UseItemAction";
import { UpperFloorRoom } from "../rooms/UpperFloor";
import { PickUpAction } from "../actions/PickUpActions";
import { GuestRoomAttic } from "../rooms/GuestRoomAttic";
import { ServeerplaatItem } from "../items/ServeerplaatItem";
import { AtticAccessItem } from "../items/AtticAccessItem";
import { WerkkamerRoom } from "../rooms/WerkkamerRoom";
import { GuestRoom } from "../rooms/GuestRoom";
import { GlueItem } from "../items/GlueItem";
import { DoorHandleItem } from "../items/DoorhandleItem";
import { BasementRoom } from "../rooms/BasementRoom";
import { GhostCharacter } from "../characters/GhostCharacter";
import { CabinetItem } from "../items/CabinetItem";
import { CouchItem } from "../items/CouchItem";
import { TableItem } from "../items/TableItem";
import { MysteriousStickItem } from "../items/MysteriousStickItem";
import { BookshelfItem } from "../items/BookshelfItem";
import { KnifeItem } from "../items/KnifeItem";
import { GiveAction } from "../actions/GiveAction";
import { RavenCharacter } from "../characters/RavenCharacter";
import { BirdCharacter } from "../characters/BirdCharacter";
import { ForrestRoom } from "../rooms/ForrestRoom";
import { WakeUpRoom } from "../rooms/WakeUpRoom";
import { StartAreaItem } from "../items/StartAreaItem";
import { KitchenRoom } from "../rooms/KitchenRoom";
import { ChefCharacter } from "../characters/ChefCharacter";
import { MysteriousPaperItem } from "../items/MysteriousPaperItem";
import { GuardQuizRoom } from "../rooms/GuardQuizRoom";
import { GuardCharacter } from "../characters/GuardCharacter";
import { GameOverRoom } from "../rooms/GameOverRoom";
import { AtticRoom } from "../rooms/AtticRoom";
import { HatchOpenerItem } from "../items/HatchOpenerItem";
import { WoodenStickitem } from "../items/WoodenStickItem";
import { GhostAtticCharacter } from "../characters/GhostAtticCharacter";
import { BirdCharachter } from "../characters/BirdCharachter";
import { GoodEndingRoom } from "../rooms/GoodEndingRoom";
import { OpenAction } from "../actions/OpenAction";
import { InspectAction } from "../actions/InspectAction";
/**
 * Implementation of the game service used to operate the game engine
 */
export class GameService extends BaseGameService<PlayerSession> {
    /**
     * Create a new instance of the game service
     */
    public constructor() {
        super("game");

        // Rooms
        this.registerGameObject(AtticRoom);
        this.registerGameObject(StartupRoom);
        this.registerGameObject(WakeUpRoom);
        this.registerGameObject(ForrestRoom);
        this.registerGameObject(LobbyRoom);
        this.registerGameObject(UpperFloorRoom);
        this.registerGameObject(PathToTheCastleRoom);
        this.registerGameObject(CastleDoorEnteranceRoom);
        this.registerGameObject(GuestRoomAttic);
        this.registerGameObject(GuestRoomAttic);
        this.registerGameObject(WerkkamerRoom);
        this.registerGameObject(GuestRoom);
        this.registerGameObject(BasementRoom);
        this.registerGameObject(BasementRoom);
        this.registerGameObject(KitchenRoom);
        this.registerGameObject(GuardQuizRoom);
        this.registerGameObject(GameOverRoom);
        this.registerGameObject(GoodEndingRoom);

        // Items
        this.registerGameObject(HatchOpenerItem);
        this.registerGameObject(WoodenStickitem);
        this.registerGameObject(TeddyBearItem);
        this.registerGameObject(StonesItem);
        this.registerGameObject(Stone1Item);
        this.registerGameObject(Stone2Item);
        this.registerGameObject(Stone3Item);
        this.registerGameObject(Stone4Item);
        this.registerGameObject(KeyItem);
        this.registerGameObject(StartAreaItem);
        this.registerGameObject(CastleEnteranceDoorItem);
        this.registerGameObject(ServeerplaatItem);
        this.registerGameObject(AtticAccessItem);
        this.registerGameObject(GlueItem);
        this.registerGameObject(DoorHandleItem);
        this.registerGameObject(CabinetItem);
        this.registerGameObject(CouchItem);
        this.registerGameObject(TableItem);
        this.registerGameObject(MysteriousStickItem);
        this.registerGameObject(BookshelfItem);
        this.registerGameObject(KnifeItem);
        this.registerGameObject(MysteriousPaperItem);

        // Characters
        this.registerGameObject(GhostAtticCharacter);
        this.registerGameObject(BirdCharachter);
        this.registerGameObject(ButlerCharacter);
        this.registerGameObject(GhostCharacter);
        this.registerGameObject(RavenCharacter);
        this.registerGameObject(BirdCharacter);
        this.registerGameObject(ChefCharacter);
        this.registerGameObject(GuardCharacter);

        // Actions
        this.registerAction(WalkAction);
        this.registerAction(SearchAction);
        this.registerAction(UseItemAction);
        this.registerAction(PickUpAction);
        this.registerAction(GiveAction);
        this.registerAction(OpenAction);
        this.registerAction(InspectAction);
    }

    /**
     * @inheritdoc
     */
    public createNewPlayerSession(): PlayerSession {
        return {
            currentRoom: StartupRoom.Alias,
            inventory: [], // Ensure KeyItem is in the inventory
            lookedUnderStone1: false,
            lookedUnderStone2: false,
            lookedUnderStone3: false,
            lookedUnderStone4: false,
            keyFound: false,
            CastleEnteranceDoorOpened: false,
            GhostQuestStarted: false,
            TeddyBearFound: false,
            GhostQuestCompleted: false,
            pickedupDoorhandle: false,
            pickedupGlue: false,
            pickedupTeddyBear: false,
            ChefQuestStarted: false,
            ChefQuestCompleted: false,
            knifeGiven: false,
            guestdooropen: false,
            guestaticdooropen: false,
            SpokeToBird: false,
            quizCompleted: false,
            incorrectAnswers: 0,
            quizFailed: false,
            HatchOpened: false,
            confirmingWalkToGuardQuiz: false,

        };
    }

    /**
     * Get the contents of the player inventory as a list of game objects instances
     *
     * @returns List of game object instances. Can be empty when no game objects were found.
     */
    public getGameObjectsFromInventory(): GameObject[] {
        return this.getGameObjectsByAliases(this.getPlayerSession().inventory);
    }
}
