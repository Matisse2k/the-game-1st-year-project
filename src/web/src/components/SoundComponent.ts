import { SoundService } from "../services/SoundService";

export class SoundComponent extends HTMLElement {
    private _soundService: SoundService = new SoundService();
    private _audioElement: HTMLAudioElement = new Audio();

    public async connectedCallback(): Promise<void> {
        this.attachShadow({ mode: "open" });
        await this.fetchSounds();
        this.render();
    }

    public get audioElement(): HTMLAudioElement {
        return this._audioElement;
    }

    private async fetchSounds(): Promise<void> {
        try {
            this._sounds = await this._soundService.fetchSounds();
            await this._soundService.fetchSounds();
        }
        catch (error) {
            console.error("Error fetching sounds:", error);
        }
    }

    private playSound(sound: string): void {
        this._soundService.playSound(sound).then(({ soundUrl }) => {
            this._audioElement.src = soundUrl;
            void this._audioElement.play();
        }).catch((error: unknown) => {
            console.error("Error playing sound:", error);
        });
    }

    private render(): void {
        if (!this.shadowRoot) return;

        // Example usage of playSound
        this.playSound("example-sound");

        this.shadowRoot.innerHTML = `
            <style>
                .sound-controls {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 10px;
                    background-color: #1a1a1a;
                    padding: 10px;
                    border: 1px solid #333;
                    border-radius: 5px;
                    color: #fff;
                    z-index: 1000;
                }
                .sound-controls button, input[type="range"] {
                    background-color: #333;
                    color: #fff;
                    border: 1px solid #444;
                    border-radius: 5px;
                    padding: 5px;
                }
                .sound-controls button:hover {
                    background-color: #555;
                }
            </style>
            <div class="sound-controls">
                <button id="mute-button">Mute</button>
                <input id="volume-slider" type="range" min="0" max="1" step="0.1" value="1" />
            </div>
        `;

        const muteButton: HTMLButtonElement = this.shadowRoot.querySelector("#mute-button") as HTMLButtonElement;
        const volumeSlider: HTMLInputElement = this.shadowRoot.querySelector("#volume-slider") as HTMLInputElement;

        muteButton.addEventListener("click", () => {
            this._audioElement.muted = !this._audioElement.muted;
            muteButton.textContent = this._audioElement.muted ? "Unmute" : "Mute";
        });

        volumeSlider.addEventListener("input", () => {
            this._audioElement.volume = parseFloat(volumeSlider.value);
        });
    }
}
customElements.define("sound-component", SoundComponent);
