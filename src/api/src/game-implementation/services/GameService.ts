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
import { BovenHalRoom } from "../rooms/BovenHalRoom";
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
        this.registerGameObject(StartupRoom);
        this.registerGameObject(LobbyRoom);
        this.registerGameObject(BovenHalRoom);
        this.registerGameObject(PathToTheCastleRoom);
        this.registerGameObject(CastleDoorEnteranceRoom);
        this.registerGameObject(GuestRoomAttic);
        this.registerGameObject(GuestRoomAttic);
        this.registerGameObject(WerkkamerRoom);
        this.registerGameObject(GuestRoom);
        this.registerGameObject(BasementRoom);
        this.registerGameObject(BasementRoom);

        // Items
        this.registerGameObject(TeddyBearItem);
        this.registerGameObject(StonesItem);
        this.registerGameObject(Stone1Item);
        this.registerGameObject(Stone2Item);
        this.registerGameObject(Stone3Item);
        this.registerGameObject(Stone4Item);
        this.registerGameObject(KeyItem);
        this.registerGameObject(CastleEnteranceDoorItem);
        this.registerGameObject(ServeerplaatItem);
        this.registerGameObject(AtticAccessItem);
        this.registerGameObject(GlueItem);
        this.registerGameObject(DoorHandleItem);
        this.registerGameObject(CabinetItem);
        this.registerGameObject(CouchItem);
        this.registerGameObject(TableItem);

        // Characters
        this.registerGameObject(ButlerCharacter);
        this.registerGameObject(GhostCharacter);

        // Actions
        this.registerAction(WalkAction);
        this.registerAction(SearchAction);
        this.registerAction(UseItemAction);
        this.registerAction(PickUpAction);
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
