import { css } from "../helpers/webComponents";
import { PlattegrondService } from "../services/PlattegrondService";
/** CSS affecting the {@link PlattegrondComponent} */
const styles: string = css`
    :host {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Arial, sans-serif;
        width: 100%;
        height: 100vh;
        padding: 10px;
        border-radius: 5px;
        background-color: rgba(0,0,0,0.5);
        position: absolute;
        box-sizing: border-box;
        top: 0;
        left: 0;
    }

    h1 {
        color: #333;
        font-size: 1.5em;
    }

    p {
        color: #666;
        font-size: 1em;
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
        margin: 4px 2px;
        cursor: pointer;
        transition-duration: 1.0s
    }

    button:hover {
        background-color: #b5251b;
    }

    img {
        width: 100%;
        max-width: 800px; 
        height: auto;
        display: block;
        margin: 0 auto;
    }

    .container {
        width: 80%; 
        max-width: 1000px;
        text-align: center;
        padding: 20px;
    }
`;

export class PlattegrondComponent extends HTMLElement {
    private _plaatjeService: PlattegrondService = new PlattegrondService();

    public async connectedCallback(): Promise<void> {
        this.attachShadow({ mode: "open" });

        const BovenOfBeneden: boolean = await this._plaatjeService.fetchPlaatje();

        if (BovenOfBeneden) {
            this.renderBoven();
        }
        else {
            this.renderBenenden();
        }

        // Add event listener for the button
        this.shadowRoot?.querySelector("#alert-button")?.addEventListener("click", () => {
            this.remove(); // Remove the map component from the DOM
        });
    }

    private renderBenenden(): void {
        if (!this.shadowRoot) {
            return;
        }

        // Clear the shadowRoot and reapply the styles and content
        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            <div class="container">
                <img src="/assets/img/rooms/Plattegrondbeneden.png" alt="boven verdieping">
                <button id="alert-button">X</button>
            </div>
        `;
    }

    private renderBoven(): void {
        if (!this.shadowRoot) {
            return;
        }

        // Clear the shadowRoot and reapply the styles and content
        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            <div class="container">
                <img src="/assets/img/rooms/Plattegrondboven.png" alt="boven verdieping">
                <button id="alert-button">X</button>
            </div>
        `;
    }
}
