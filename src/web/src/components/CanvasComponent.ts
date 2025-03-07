import { ActionReference, DefaultGameState, GameObjectReference, GameState } from "@shared/types";
import { css, html, htmlArray } from "../helpers/webComponents";
import { GameEventService } from "../services/GameEventService";
import { GameRouteService } from "../services/GameRouteService";
import { Page } from "../enums/Page";

/** CSS affecting the {@link CanvasComponent} */
const styles: string = css`
    :host {
        font-family: "Onesize";
        width: 100%;
        max-width: 1024px;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto calc(35vh + 10px) minmax(calc(35vh + 10px), 1fr) auto;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }

    .title {
        text-align: center;
        margin-top: 10px;
    }

    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        margin-top: 10px;
        width: 100%;
        height: 100%;
    }

    .header img {
        width: 100%;
        height: auto;
        max-height: 110%;
        object-fit: contain;
        image-rendering: pixelated;
        position: absolute;
    }

    .header img.startup {
        min-height: 90vh;
    }

    .start-game-button {
        position: absolute;
        bottom: -110%;
        left: 49%;
        transform: translateX(-50%);
        background-color: rgb(0, 0, 0);
        opacity: 0.78;
        border-radius: 8px;
        padding: 10px 15px;
        cursor: pointer;
        display: inline-block;
        user-select: none;
        color: white;
        font-family: "Onesize";
        font-size: 1.2em;
        border: 1px solid black;
    }

    .start-game-button:hover {
        background-color: #444;
    }

    .start-game-text {
        position: absolute;
        bottom: -74%;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 1.1em;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 10px;
        border-radius: 5px;
        width: 70%;
        max-width: 100%;
    }

    .content {
        flex-grow: 1;
        margin-top: 40px;
        padding: 0 10px;
        overflow: auto; /* Ensure content is scrollable if it overflows */
        margin-bottom: 20px; /* Add margin to ensure space between content and inventory */
    }

    .content p {
        margin: 0 0 10px 0;
    }

    .content p:last-of-type {
        margin: 0;
    }

    .footer {
        border-radius: 10px;
        background-color: #828282;
        border: 1px solid black;
        margin-bottom: 20px;
        display: flex;
        height: 120px;
    }

    .footer .buttons {
        display: flex;
        flex-direction: column;
        overflow: auto;
        padding: 10px 10px 0 10px;
    }

    .footer .button {
        background-color: black;
        padding: 5px 10px;
        margin: 0 0 10px 10px;
        text-transform: uppercase;
        cursor: pointer;
        display: inline-block;
        user-select: none;
    }

    .footer .button.active,
    .footer .button:hover {
        background-color: #332c57;
    }

    @media (max-width: 768px) {
        .start-game-button {
            font-size: 1em;
            padding: 8px 16px;
            bottom: -68%;
        }

        .start-game-text {
            font-size: 1em;
            padding: 8px;
            bottom: -48%;
        }

        .header img.startup {
            min-height: 75vh;
        }

        .content {
            margin-bottom: 50px; /* Increase margin to ensure space between content and inventory */
        }
    }

    @media (max-width: 480px) {
        .start-game-button {
            font-size: 0.9em;
            padding: 10px 10px;
            bottom: -50%;
            left: 49%;
        }

        .start-game-text {
            font-size: 0.9em;
            padding: 6px;
            bottom: -25%;
        }
        
        .header img.startup {
            min-height: 65vh;
        }

        .typewriter {
    display: inline-block;
    white-space: pre-wrap;
    overflow: hidden;
    border-right: 0.15em solid orange; /* Cursor effect */
    animation: blink-caret 0.75s step-end infinite;
}

@keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: orange; }
}

        .content {
            margin-bottom: 20px; /* Further increase margin to ensure space between content and inventory */
        }
    }
`;

/**
 * Represents the Canvas page
 */
export class CanvasComponent extends HTMLElement {
    /** Instance of the game event service */
    private readonly _gameEventService: GameEventService = new GameEventService();
    /** Instance of the game route service */
    private readonly _gameRouteService: GameRouteService = new GameRouteService();

    /** Current game state */
    private _currentGameState?: DefaultGameState;
    /** Current active action button */
    private _selectedActionButton?: ActionReference;
    /** Current active game object buttons */
    private _selectedGameObjectButtons: Set<GameObjectReference> = new Set<GameObjectReference>();

    private _previousText: string = ""; // Stores the previous text to detect changes

    /**
     * The "constructor" of a Web Component
     */
    public connectedCallback(): void {
        this.attachShadow({ mode: "open" });

        void this.refreshGameState();
    }

    /**
     * Refresh the current game state
     */
    private async refreshGameState(): Promise<void> {
        const state: GameState = await this._gameRouteService.getGameState();

        this.updateGameState(state);
    }

    /**
     * Update the canvas to the provided game state
     *
     * @param state Game state to update the canvas to
     */
    private updateGameState(state: GameState): void {
        // Handle switching pages, if requested.
        if (state.type === "switch-page") {
            this._gameEventService.switchPage(state.page as Page);

            return;
        }

        // Reset the component
        this._currentGameState = state;

        this._selectedActionButton = undefined;
        this._selectedGameObjectButtons.clear();

        // Refresh the web component
        this.render();
    }

    /**
     * Render the contents of this page
     */
    private render(): void {
        if (!this.shadowRoot) {
            return;
        }

        const elements: HTMLElement[] = htmlArray`
            <style>
                ${styles}
            </style>

            ${this.renderTitle()}
            ${this.renderHeader()}
            ${this.renderContent()}
            <div style="margin-bottom: 25px;"></div> <!-- Add a spacer div to ensure space between content and inventory -->
            ${this.renderInventory()}
            ${this.renderFooter()}
    `;

        while (this.shadowRoot.firstChild) {
            this.shadowRoot.firstChild.remove();
        }

        this.shadowRoot.append(...elements);

        // Add event listener for the start game button in the startup room
        const startGameButton: Element | null = this.shadowRoot.querySelector(".start-game-button");
        if (startGameButton) {
            startGameButton.addEventListener("click", () => this.handleClickAction({ alias: "start-game-from-image", name: "Start Game", needsObject: false }));
        }

        // Apply typewriter effect to the content only if the text has changed
        const newText: string = this._currentGameState?.text.join(" ") || "";
        if (newText !== this._previousText) {
            this.typeWriterEffect(newText, "typewriter");
            this._previousText = newText;
        }
        else {
            const typewriterElement: HTMLElement | null = this.shadowRoot.querySelector("#typewriter");
            if (typewriterElement) {
                typewriterElement.innerHTML = newText;
            }
        }
    }

    /**
     * Render the title element
     *
     * @returns String with raw HTML for the title element. Can be empty.
     */
    private renderTitle(): string {
        const roomName: string | undefined = this._currentGameState?.roomName;

        if (roomName) {
            return `<div class="title">${roomName}</div>`;
        }

        return "";
    }

    /**
     * Render the header element
     *
     * @returns String with raw HTML for the header element. Can be empty.
     */
    private renderHeader(): string {
        const roomImages: string[] | undefined = this._currentGameState?.roomImages;

        if (roomImages && roomImages.length > 0) {
            const isStartupRoom: boolean = this._currentGameState?.roomName === "The shadows of the forgotten Castle";
            return `
                <div class="header">
                    ${roomImages.map(url => `<img class="${isStartupRoom ? "startup" : ""}" src="/assets/img/rooms/${url}.png"
                         onerror="this.onerror=null;this.src='/assets/img/rooms/${url}.gif';" />
                        ${isStartupRoom
? `
                            <div class="start-game-text">Press the button below to start your journey.</div>
                            <button class="start-game-button">Start Game</button>
                        `
: ""}
                    `).join("")}
                </div>
            `;
        }

        return "";
    }

    /**
     * Render the content element
     *
     * @returns String with raw HTML for the content element
     */
    private renderContent(): string {
        return `
            <div class="content">
            <span id="typewriter" class="typewriter"></span>
                
            </div>
        `;
    }

    /**
     * Render the inventory element
     *
     * @returns String with raw HTML for the inventory element
     */
    private renderInventory(): string {
        if (this._currentGameState?.roomName === "The shadows of the forgotten Castle") {
            return "";
        }

        return "<game-inventory></game-inventory>";
    }

    /**
     * Apply a typewriter effect to the specified element
     *
     * @param text The text to display with the typewriter effect
     * @param elementId The ID of the element to apply the effect to
     * @param speed The speed of the typewriter effect in milliseconds per character
     */
    private typeWriterEffect(text: string, elementId: string, speed: number = 27): void { // adjust speed per ms
        const element: HTMLElement | null | undefined = this.shadowRoot?.getElementById(elementId);
        if (!element) return;

        element.innerHTML = ""; // Clear the element before starting the animation

        let i: number = 0;
        const interval: NodeJS.Timeout = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            }
            else {
                clearInterval(interval);
            }
        }, speed);
    }

    /**
     * Render the footer element
     *
     * @returns HTML element of the footer
     */
    private renderFooter(): HTMLElement {
        if (this._currentGameState?.roomName === "The shadows of the forgotten Castle") {
            return html`<div>`; // Do not render footer for startup room
            // if you place something in between `` then undefined will be gone.
            // TODO: ask teacher about this (engine related)
        }

        return html`
            <div class="footer">
                <div class="buttons">
                    <div>
                        ${this._currentGameState?.actions.map(button => this.renderActionButton(button))}
                    </div>
                    <div>
                        ${this._selectedActionButton
                            ? this._currentGameState?.objects.map(button => this.renderGameObjectButton(button)) || ""
                            : ""
                        }
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render an action button for a given action reference
     *
     * @returns HTML element of the action button
     */
    private renderActionButton(button: ActionReference): HTMLElement {
        const element: HTMLElement = html`
            <a class="button ${this._selectedActionButton === button ? "active" : ""}">
                ${button.name}
            </a>
        `;

        element.addEventListener("click", () => this.handleClickAction(button));

        return element;
    }

    /**
     * Render a game object button for a given game object reference
     *
     * @returns HTML element of the game object button
     */
    private renderGameObjectButton(button: GameObjectReference): HTMLElement {
        const element: HTMLElement = html`
            <a class="button ${this._selectedGameObjectButtons.has(button) ? "active" : ""}">
                ${button.name}
            </a>
        `;

        element.addEventListener("click", () => this.handleClickGameObject(button));

        return element;
    }

    /**
     * Handle the click on an action button
     *
     * @param button Action button that was clicked
     */
    private async handleClickAction(button: ActionReference): Promise<void> {
        // If this actions needs a game object, show the available game objects.
        if (button.needsObject) {
            this._selectedActionButton = button;
            this._selectedGameObjectButtons.clear();

            this.render();

            return;
        }

        // Otherwise, execute the action and update the game state.
        const state: GameState | undefined = await this._gameRouteService.executeAction(button.alias);

        if (state === undefined) {
            return;
        }

        this.updateGameState(state);
    }

    /**
     * Handle the click on a game object button
     *
     * @param button Game object button that was clicked
     */
    private async handleClickGameObject(button: GameObjectReference): Promise<void> {
        // If no action button was clicked, do not try to handle this click.
        if (!this._selectedActionButton) {
            return;
        }

        // Add the game object to list of selected game objects
        this._selectedGameObjectButtons.add(button);

        // Try to execute the action with all game objects on the list
        const state: GameState | undefined = await this._gameRouteService.executeAction(
            this._selectedActionButton.alias,
            [...this._selectedGameObjectButtons].map(e => e.alias)
        );

        // If 2 more game objects where on the list, clear it.
        if (this._selectedGameObjectButtons.size >= 2) {
            this._selectedActionButton = undefined;
            this._selectedGameObjectButtons.clear();
        }

        // Refresh the web component
        this.render();

        // If no state was returned, exit silently. This can happen when an action needs more than 1 game object.
        if (state === undefined) {
            return;
        }

        // Otherwise, update the game state.
        this.updateGameState(state);
    }
}
