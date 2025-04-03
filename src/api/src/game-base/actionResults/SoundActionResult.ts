import { ActionResult } from "./ActionResult";

/**
 * Class used to represent the sound result of an action
 */
export class SoundActionResult extends ActionResult {
    /** Path to the audio file to play */
    private _audioFile: string;

    /**
     * Create a new instance of this action result
     *
     * @param audioFile Path to the audio file to play
     */
    public constructor(audioFile: string) {
        super();

        this._audioFile = audioFile;
    }

    /**
     * Get the audio file to play
     */
    public get audioFile(): string {
        return this._audioFile;
    }

    /**
     * Apply the sound action result
     *
     * This method should handle playing the audio file.
     */
    public apply(): void {
        console.log(`Playing sound: ${this._audioFile}`);
        const audio: HTMLAudioElement = new Audio(this._audioFile);
        audio.play().catch((error: unknown) => {
            console.error(`Failed to play sound: ${this._audioFile}`, error);
        });
    }
}

/* Hoe te gebruiken!
import { SoundActionResult } from "./SoundActionResult";

// Maak een nieuwe SoundActionResult aan
const soundAction = new SoundActionResult("/assets/audio/door_open.mp3");

// Pas de actie toe (speel het geluid af)
soundAction.apply();
 */
