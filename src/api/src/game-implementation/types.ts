/**
 * Represents all data that should be stored for a player
 *
 * @remarks Can only contain JSON data types
 */
export type PlayerSession = {
    /** Alias of the room the player is in */
    currentRoom: string;
    /** List of game object aliases the player owns */
    inventory: string[];
    lookedUnderStone1: boolean;
    lookedUnderStone2: boolean;
    lookedUnderStone3: boolean;
    lookedUnderStone4: boolean;
    keyFound: boolean;
    CastleEnteranceDoorOpened: boolean;
    pickedupDoorhandle: boolean;
    pickedupGlue: boolean;
    GhostQuestStarted: boolean;
    TeddyBearFound: boolean;
    GhostQuestCompleted: boolean;
    guestdooropen: boolean;
    guestaticdooropen: boolean;
    MysteriousStickRevealed?: boolean;
    HatchOpened?: boolean;
    pickedupTeddyBear: boolean;
    ChefQuestStarted: boolean;
    ChefQuestCompleted: boolean;
    knifeGiven: boolean;
    SpokeToBird: boolean;
    incorrectAnswers: number;
    quizCompleted: boolean;
    quizFailed: boolean;
    confirmingWalkToGuardQuiz: boolean;
    BovenOfBeneden: boolean;
    FirstTimeButler: boolean;
    GotCastleMap: boolean;
    TalkedToBird: boolean;
    butlerspermission: boolean;
};
