import { css } from "../helpers/webComponents";
import { AchievementStatusService } from "../services/AchievementStatusService";

const styles: string = css`
    :host {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        font-family: Arial, sans-serif;
        width: 100%;
        height: 100vh;
        padding: 10px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.58);
        position: absolute;
        box-sizing: border-box;
        top: 0;
        left: 0;
        overflow: hidden;
    }

    h1 {
        color: white;
        font-size: 2em;
        margin-top: 20px;
    }

    .row {
        display: flex;
        justify-content: space-around;
        width: 100%;
        max-width: 1000px;
        margin-top: 10px;
        flex-wrap: wrap;
    }

    .column {
        color: white;
        font-size: 1em;
        text-align: center;
        flex: 1;
        padding: 10px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        margin: 5px;
    }
    
    .head {
        font-size: 1.2em;
        font-weight: bold;
        margin-bottom: 10px;
        text-transform: uppercase;
        color: #ffcc00;
    }

    .column div {
        margin: 20px 0;
    }

    .completed {
        color: #66ff66; 
    }

    .active {
        color: orange;
    }

    .inactive {
       color: #ff6666;
    }
    
    button {
        background-color: #fb5448;
        width: 80%;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 10px 0;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-top: auto;
        margin-bottom: 20px;
    }

    button:hover {
        background-color: #b5251b;
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #444;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        z-index: 1000;
    }

    .changed-statuses {
        color: yellow;
        margin-bottom: 20px;
        text-align: center;
    }
`;

export class MenuComponent extends HTMLElement {
    private _achievementStatus: AchievementStatusService = new AchievementStatusService();
    public connectedCallback(): void {
        this.attachShadow({ mode: "open" });
        this.render();
    }

    public render(): void {
        const shadowRoot: ShadowRoot | null = this.shadowRoot;
        if (!shadowRoot) {
            console.error("Shadow root is null");
            return;
        }

        this._achievementStatus.fetchAllStatuses()
            .then(statuses => {
                console.log(statuses);

                // Check for status changes
                shadowRoot.innerHTML = `
                    <style>${styles}</style>
                    <h1>Achievements</h1>
                    <div class="row">
                        <div class="column">
                            <div class="head">Achievement name</div>
                            <div>A Haunting Quest</div>
                            <div>Chef's Kiss</div>
                            <div>one of two</div>
                            <div>shocking end</div>
                            <div>Quiz Master</div>
                        </div>
                        <div class="column">
                            <div class="head">Current status</div>
                            <div class="${statuses.ghostQuest}">${statuses.ghostQuest}</div>
                            <div class="${statuses.chefQuest}">${statuses.chefQuest}</div>
                            <div class="${statuses.doorQuest}">${statuses.doorQuest}</div>
                            <div class="${statuses.endingQuest}">${statuses.endingQuest}</div>
                            <div class="${statuses.quizQuest}">${statuses.quizQuest}</div>
                        </div>
                        <div class="column">
                            <div class="head">Description</div>
                            <div>Complete The Ghost Quest</div>
                            <div>Complete The Chef's Quest</div>
                            <div>Open One Of The Doors On The Upper Floor</div>
                            <div>Discover The Secret Ending</div>
                            <div>Complete The Quard's Quiz With Zero Mistakes</div>
                        </div>
                    </div>
                    <button onclick="location.reload()">Back to Game</button>
                  `;

                // Reset statusChanged and changedQuest
            })
            .catch((error: unknown) => {
                console.error("Error fetching statuses:", error);
                shadowRoot.innerHTML = `
                    <style>${styles}</style>
                    <h1>Achievements</h1>
                    <div class="row">
                        <div class="column">
                            <div class="head">Achievement name</div>
                            <div>A Haunting Quest</div>
                            <div>Chef's Kiss</div>
                            <div>one of two</div>
                            <div>shocking end</div>
                            <div>Quiz Master</div>
                        </div>
                        <div class="column">
                            <div class="head">Current status</div>
                            <div class="inactive">Error fetching statuses</div>
                            <div class="inactive">Text 2</div>
                            <div class="inactive">Text 3</div>
                            <div class="inactive">Text 4</div>
                            <div class="inactive">Text 5</div>
                        </div>
                        <div class="column">
                            <div class="head">Description</div>
                            <div>Complete The Ghost Quest</div>
                            <div>Complete The Chef's Quest</div>
                            <div>Open One Of The Doors On The Upper Floor</div>
                            <div>Discover The Secret Ending</div>
                            <div>Complete The Quard's Quiz With Zero Mistakes</div>
                        </div>
                    </div>
                    <button onclick="location.reload()">Back to Game</button>`;
            });
    }
}
