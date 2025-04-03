import { BaseRouteService } from "./BaseRouteService";

export class SoundService extends BaseRouteService {
    /**
     * Fetch the list of available sounds from the backend
     *
     * @returns List of sound file names
     */
    public async fetchSounds(): Promise<string[]> {
        return this.getJsonApi<string[]>("list");
    }

    /**
     * Play a specific sound by its name
     *
     * @param sound The name of the sound file
     * @returns The URL of the sound being played
     */
    public async playSound(sound: string): Promise<{ soundUrl: string }> {
        return this.getJsonApi<{ soundUrl: string }>(`play/${sound}`);
    }

    /**
     * Fetch the background sound URL for a specific room
     *
     * @param roomName The name of the room
     * @returns The URL of the background sound
     */
    public fetchBackgroundSound(roomName: string): Promise<string> {
        const formattedRoomName: string = roomName.toLowerCase().replace(/\s+/g, "_");
        return Promise.resolve(`/sounds/${formattedRoomName}.mp3`);
    }
}
