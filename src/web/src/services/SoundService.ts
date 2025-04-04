import { BaseRouteService } from "./BaseRouteService";

export class SoundService extends BaseRouteService {
    /**
     * Fetch the list of available sounds from the backend
     *
     * @returns List of sound file names
     */

    /**
     * Play a specific sound by its name
     *
     * @param sound The name of the sound file
     * @returns The URL of the sound being played
     */
    public async playSound(sound: string): Promise<{ soundUrl: string }> {
        return this.getJsonApi<{ soundUrl: string }>(`Mattise/play/${sound}`);
    }

    /**
     * Fetch the background sound URL for a specific room
     *
     * @param roomName The name of the room
     * @returns The URL of the background sound
     */
    public fetchBackgroundSound(roomName: string): Promise<string> {
        const formattedRoomName: string = roomName.toLowerCase().replace(/\s+/g, "_");
        return Promise.resolve(`Mattise/sounds/${formattedRoomName}.mp3`);
    }

    /**
     * Save the audio state (e.g., volume, mute) to localStorage
     *
     * @param key The key to store the state under
     * @param value The value to store
     */
    public saveAudioState(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    /**
     * Retrieve the audio state from localStorage
     *
     * @param key The key to retrieve the state from
     * @returns The stored value or null if not found
     */
    public getAudioState(key: string): string | null {
        return localStorage.getItem(key);
    }
}
