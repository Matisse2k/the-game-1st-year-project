import { css } from "../helpers/webComponents";
import { AchievementStatusService } from "../services/AchievementStatusService";

const styles: string = css`
    :host {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        font-family: "Cinzel", serif;
        width: 100%;
        height: 100vh;
        padding: 20px;
        background: linear-gradient(135deg, #121212, #1e1e2f);
        background-size: cover;
        position: absolute;
        box-sizing: border-box;
        top: 0;
        left: 0;
        overflow: hidden;
    }

    :host::before {
        content: '';
        position: absolute;
        inset: 0;
        background: url('/path/to/dark-theme-texture.jpg') center/cover no-repeat;
        opacity: 0.1;
        z-index: -1;
    }

    h1 {
        color: #d4af37; /* Changed from #ffcc00 to muted gold */
        font-size: 3em;
        margin-top: 20px;
        text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.7);
        animation: fadeIn 1s ease-in-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .row {
        display: flex;
        justify-content: space-around;
        width: 100%;
        max-width: 800px;
        margin-top: 20px;
        flex-wrap: wrap;
        gap: 20px;
    }

    .column {
        color: white;
        font-size: 1em;
        text-align: center;
        flex: 1;
        padding: 20px;
        background: linear-gradient(145deg, #1a1a2b, #121212);
        border-radius: 15px;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
        margin: 10px;
        max-width: 300px;
        min-width: 250px;
        position: relative;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .column:hover {
        transform: translateY(-10px);
        box-shadow: 0 12px 20px rgba(0, 0, 0, 0.7);
    }

    .head {
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 15px;
        text-transform: uppercase;
        color: #d4af37; /* Changed from #ffcc00 to muted gold */
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }

    .column div {
        margin: 15px 0;
        transition: color 0.3s ease, transform 0.3s ease;
    }

    .column div:hover {
        transform: scale(1.1);
        color: #d4af37; /* Changed from #ffcc00 to muted gold */
    }

    .badge {
        position: absolute;
        top: -15px;
        right: -15px;
        background-color: #d4af37; /* Changed from #ffcc00 to muted gold */
        color: black;
        font-size: 0.8em;
        font-weight: bold;
        padding: 5px 10px;
        border-radius: 50%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .completed {
        color: #66ff66;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }

    .active {
        color: orange;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }

    .inactive {
        color: #ff6666;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }

    button {
        background-color: #d4af37; /* Changed from #ffcc00 to muted gold */
        width: 80%;
        color: black;
        border: none;
        border-radius: 10px;
        padding: 15px 25px;
        text-decoration: none;
        display: inline-block;
        font-size: 1.2em;
        margin: 20px 0;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    button:hover {
        background-color: #b38e2c; /* Adjusted hover color to match new theme */
        transform: scale(1.05);
    }

    .separator {
        width: 90%;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.2);
        margin: 10px auto;
    }

    .modal {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        max-width: 600px;
        background: #1a1a2b;
        color: white;
        border-radius: 15px;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
        z-index: 1000;
        padding: 20px;
        text-align: center;
    }

    .modal.active {
        display: block;
    }

    .modal h2 {
        font-size: 2em;
        color: #d4af37; /* Changed from #ffcc00 to muted gold */
        margin-bottom: 15px;
    }

    .modal p {
        font-size: 1.2em;
        margin-bottom: 20px;
    }

    .modal button {
        background-color: #d4af37; /* Changed from #ffcc00 to muted gold */
        color: black;
        border: none;
        border-radius: 10px;
        padding: 10px 20px;
        font-size: 1em;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .modal button:hover {
        background-color: #b38e2c; /* Adjusted hover color to match new theme */
    }

    .quest-item {
        cursor: pointer;
    }

    .quest-item:hover {
        text-decoration: underline;
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
                shadowRoot.innerHTML = `
                    <style>${styles}</style>
                    <h1>Achievements</h1>
                    <div class="row">
                        <div class="column">
                            <div class="head">Achievement name</div>
                            <div class="quest-item" data-quest="ghostQuest">A Haunting Quest</div>
                            <div class="separator"></div>
                            <div class="quest-item" data-quest="chefQuest">Chef's Kiss</div>
                            <div class="separator"></div>
                            <div class="quest-item" data-quest="doorQuest">One of Two</div>
                            <div class="separator"></div>
                            <div class="quest-item" data-quest="endingQuest">Shocking End</div>
                            <div class="separator"></div>
                            <div class="quest-item" data-quest="quizQuest">Quiz Master</div>
                        </div>
                        <div class="column">
                            <div class="head">Current status</div>
                            <div class="${statuses.ghostQuest}">${statuses.ghostQuest}</div>
                            <div class="separator"></div>
                            <div class="${statuses.chefQuest}">${statuses.chefQuest}</div>
                            <div class="separator"></div>
                            <div class="${statuses.doorQuest}">${statuses.doorQuest}</div>
                            <div class="separator"></div>
                            <div class="${statuses.endingQuest}">${statuses.endingQuest}</div>
                            <div class="separator"></div>
                            <div class="${statuses.quizQuest}">${statuses.quizQuest}</div>
                        </div>
                    </div>
                    <button onclick="location.reload()">Back to Game</button>
                    <div class="modal" id="quest-modal">
                        <h2 id="modal-title"></h2>
                        <p id="modal-description"></p>
                        <button id="close-modal">Close</button>
                    </div>
                `;

                this.addQuestClickListeners();
            })
            .catch((error: unknown) => {
                console.error("Error fetching statuses:", error);
            });
    }

    private addQuestClickListeners(): void {
        const shadowRoot: ShadowRoot = this.shadowRoot!;
        const questItems: NodeListOf<Element> = shadowRoot.querySelectorAll(".quest-item");
        const modal: HTMLElement = shadowRoot.querySelector(".modal") as HTMLElement;
        const modalTitle: HTMLElement = shadowRoot.querySelector("#modal-title") as HTMLElement;
        const modalDescription: HTMLElement = shadowRoot.querySelector("#modal-description") as HTMLElement;
        const closeModalButton: HTMLElement = shadowRoot.querySelector("#close-modal") as HTMLElement;

        const questDetails: Record<string, { title: string; description: string }> = {
            ghostQuest: { title: "A Haunting Quest", description: "Complete The Ghost Quest." },
            chefQuest: { title: "Chef's Kiss", description: "Complete The Chef's Quest." },
            doorQuest: { title: "One of Two", description: "Open One Of The Doors On The Upper Floor." },
            endingQuest: { title: "Shocking End", description: "Discover The Secret Ending." },
            quizQuest: { title: "Quiz Master", description: "Complete The Quard's Quiz With Zero Mistakes." },
        };

        questItems.forEach(item => {
            item.addEventListener("click", () => {
                const questKey: string = item.getAttribute("data-quest")!;
                const quest: { title: string; description: string } = questDetails[questKey];
                modalTitle.textContent = quest.title;
                modalDescription.textContent = quest.description;
                modal.classList.add("active");
            });
        });

        closeModalButton.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }
}
