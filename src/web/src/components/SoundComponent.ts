export class SoundComponent extends HTMLElement {
    private _audioElement: HTMLAudioElement = new Audio();
    private _settingsVisible: boolean = false;

    public connectedCallback(): void {
        this.attachShadow({ mode: "open" });
        this.loadAudioState(); // Load saved audio state
        this.render();
    }

    private loadAudioState(): void {
        const savedMuted: string | null = localStorage.getItem("audio-muted");
        const savedVolume: string | null = localStorage.getItem("audio-volume");

        if (savedMuted !== null) {
            this._audioElement.muted = savedMuted === "true";
        }

        if (savedVolume !== null) {
            this._audioElement.volume = parseFloat(savedVolume);
        }
    }

    public get audioElement(): HTMLAudioElement {
        return this._audioElement;
    }

    private toggleSettings(): void {
        this._settingsVisible = !this._settingsVisible;
        this.render();
    }

    private render(): void {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
                .sound-settings {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 10px;
                    background-color: rgba(0, 0, 0, 0.85); /* Darker background with transparency */
                    padding: 15px;
                    border: 2px solid #444;
                    border-radius: 8px;
                    color: #fff;
                    font-family: "Onesize", Arial, sans-serif; /* Game-themed font */
                    z-index: 1000;
                    box-sizing: border-box; /* Ensure padding and borders are included in width */
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* Add a subtle shadow */
                    max-width: 300px; /* Prevent the container from growing too large */
                }
                .sound-settings button, input[type="range"] {
                    background-color: #222;
                    color: #fff;
                    border: 2px solid #555;
                    border-radius: 5px;
                    padding: 8px 12px;
                    font-family: "Onesize", Arial, sans-serif;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    width: 100%; /* Ensure elements fit within the container */
                    box-sizing: border-box; /* Include padding and borders in width */
                }
                .sound-settings button:hover {
                    background-color: #444;
                    border-color: #777;
                }
                .sound-settings input[type="range"] {
                    -webkit-appearance: none;
                    width: 100%; /* Ensure the slider fits within the container */
                    height: 8px;
                    background: #333;
                    border-radius: 5px;
                    outline: none;
                    transition: background 0.3s ease;
                    box-sizing: border-box; /* Include padding and borders in width */
                }
                .sound-settings input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    background: #ffcc00; /* Bright thumb for better visibility */
                    border-radius: 50%;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }
                .sound-settings input[type="range"]::-webkit-slider-thumb:hover {
                    background: #ffaa00; /* Slightly brighter on hover */
                }
                .sound-settings input[type="range"]::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    background: #ffcc00;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }
                .sound-settings input[type="range"]::-moz-range-thumb:hover {
                    background: #ffaa00;
                }
                .settings-menu {
                    display: ${this._settingsVisible ? "block" : "none"};
                    margin-top: 10px;
                }
                #settings-button {
                    font-size: 16px;
                    font-weight: bold;
                    background-color: #333;
                    border: 2px solid #555;
                    padding: 10px 15px;
                    border-radius: 8px;
                    color: #ffcc00; /* Highlighted text color */
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* Subtle text shadow */
                }
                #settings-button:hover {
                    background-color: #444;
                    border-color: #777;
                    color: #ffaa00; /* Brighter highlight on hover */
                }
            </style>
            <div class="sound-settings">
                <button id="settings-button">Sound Settings</button>
                <div class="settings-menu">
                    <button id="mute-button">${this._audioElement.muted ? "Unmute" : "Mute"}</button>
                    <input id="volume-slider" type="range" min="0" max="1" step="0.1" value="${this._audioElement.volume}" />
                </div>
            </div>
        `;

        const settingsButton: HTMLButtonElement = this.shadowRoot.querySelector("#settings-button") as HTMLButtonElement;
        const muteButton: HTMLButtonElement = this.shadowRoot.querySelector("#mute-button") as HTMLButtonElement;
        const volumeSlider: HTMLInputElement = this.shadowRoot.querySelector("#volume-slider") as HTMLInputElement;

        settingsButton.addEventListener("click", () => this.toggleSettings());

        muteButton.addEventListener("click", () => {
            const wasMuted: boolean = this._audioElement.muted;
            this._audioElement.muted = !wasMuted;
            if (wasMuted !== this._audioElement.muted) {
                muteButton.textContent = this._audioElement.muted ? "Unmute" : "Mute";
                localStorage.setItem("audio-muted", String(this._audioElement.muted)); // Save mute state
            }
        });

        volumeSlider.addEventListener("input", () => {
            const newVolume: number = parseFloat(volumeSlider.value);
            if (this._audioElement.volume !== newVolume) {
                this._audioElement.volume = newVolume;
                localStorage.setItem("audio-volume", String(this._audioElement.volume)); // Save volume state
            }
        });
    }
}
