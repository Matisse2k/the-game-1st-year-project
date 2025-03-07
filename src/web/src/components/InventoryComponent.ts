import { css, html, htmlArray } from "../helpers/webComponents";
import { InventoryService } from "../services/InventoryService";
/** CSS affecting the {@link InventoryComponent} */
const styles: string = css`
    :host {
        padding: 5px;
        background-color: #1a1a1a;
        border: 2px solid #333;
        border-radius: 5px;
        max-width: 1024px;
        margin: 0 auto;
        color: #fff;
        font-family: 'Press Start 2P', cursive; /* Retro pixel font */
        margin-top: -15vh;
    }

    h3 {
        text-align: center;
        font-size: 0.8em;
        margin-bottom: 5px;
        color: #ffcc00;
    }

    ul {
        display: flex; /* Ensure items are displayed horizontally */
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    li {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5px;
        border: 1px solid #444;
        margin: 5px; /* Use smaller margin to save space */
        border-radius: 5px;
        background-color: #2a2a2a;
        cursor: pointer;
    }

    .inventory-item img {
        width: 32px;
        height: 32px;
        margin-bottom: 5px;
        image-rendering: pixelated; /* Ensures the image looks pixelated */
    }

    .inventory-item span {
        font-size: 0.9em;
    }

    .inventory-placeholder {
        text-align: center;
        color: #888;
        font-size: 0.9em;
    }

    .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
        background-color: #1a1a1a;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        max-width: 500px;
        text-align: center;
        border-radius: 10px;
    }

    .modal-content img {
        width: 100px;
        height: 100px;
        image-rendering: pixelated;
    }

    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: #fff;
        text-decoration: none;
        cursor: pointer;
    }

    /* Media queries for responsive design */
    @media (max-width: 600px) {
        :host {
            max-width: 100%; /* Adjust the width for smaller screens */
            margin-top: 0; /* Reset margin-top to avoid overlap */
        }

        .modal-content {
            width: 90%;
        }

        .inventory-item img {
            width: 24px;
            height: 24px;
        }

        .inventory-item span {
            font-size: 0.8em;
        }
    }

    @media (max-width: 400px) {
        :host {
            max-width: 100%; /* Adjust the width for smaller screens */
            margin-top: 0; /* Reset margin-top to avoid overlap */
        }

        .modal-content {
            width: 95%;
        }

        .inventory-item img {
            width: 20px;
            height: 20px;
        }

        .inventory-item span {
            font-size: 0.7em;
        }
    }
`;

/**
 * Represents the Inventory component
 */
export class InventoryComponent extends HTMLElement {
    /** List of inventory items */
    private _items: { name: string; imageUrl: string; description: string }[] = [];
    private _inventoryService: InventoryService = new InventoryService();
    private _selectedItem: { name: string; imageUrl: string; description: string } | null = null;

    /**
     * The "constructor" of a Web Component
     */
    public async connectedCallback(): Promise<void> {
        this.attachShadow({ mode: "open" });
        await this.fetchInventory();
        this.render();
    }

    /**
     * Fetch the inventory items from the backend
     */
    private async fetchInventory(): Promise<void> {
        try {
            const response: string[] = await this._inventoryService.fetchInventory();
            console.log("Server response:", response); // Log de respons om te controleren
            const items: { name: string; imageUrl: string; description: string }[] = await Promise.all(response.map(async (item: string) => ({
                name: item,
                imageUrl: `/public/assets/img/rooms/items/${item}.png`,
                description: await this._inventoryService.fetchItemDescription(item),
            })));
            this.items = items;
        }
        catch (error) {
            console.error("Error fetching inventory:", error);
        }
    }

    /**
     * Set the inventory items
     *
     * @param items List of items to set
     */
    public set items(items: { name: string; imageUrl: string; description: string }[]) {
        this._items = items;
        this.render();
    }

    /**
     * Update the inventory by fetching the latest items from the backend
     */
    public async updateInventory(): Promise<void> {
        await this.fetchInventory();
        this.render();
    }

    /**
     * Render the contents of this component
     */
    private render(): void {
        if (!this.shadowRoot) {
            return;
        }

        const elements: HTMLElement[] = htmlArray`
            <style>
                ${styles}
            </style>
            <div>
                <h3>Inventory</h3> <!-- Voeg een titel toe -->
                <ul>
                    ${this._items.length > 0
                        ? this._items.map(item => html`
                            <li class="inventory-item" @click="${() => this.showItemDetails(item)}">
                                <img src="${item.imageUrl}" alt="${item.name}" />
                                <span>${item.name}</span>
                            </li>
                        `)
                        : html`<div class="inventory-placeholder">No items in inventory</div>`
                    }
                </ul>
                ${this._selectedItem
? html`
                    <div class="modal" style="display: block;">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <img src="${this._selectedItem.imageUrl}" alt="${this._selectedItem.name}" />
                            <h2>${this._selectedItem.name}</h2>
                            <p>${this._selectedItem.description}</p>
                        </div>
                    </div>
                `
: ""}
            </div>
        `;

        while (this.shadowRoot.firstChild) {
            this.shadowRoot.firstChild.remove();
        }

        this.shadowRoot.append(...elements);

        // Ensure event listeners are attached
        this.shadowRoot.querySelectorAll(".inventory-item").forEach(item => {
            item.addEventListener("click", () => {
                const spanElement: HTMLSpanElement | null = item.querySelector("span");
                if (spanElement) {
                    const itemName: string = spanElement.textContent || "";
                    const selectedItem: { name: string; imageUrl: string; description: string } | undefined = this._items.find(i => i.name === itemName);
                    if (selectedItem) {
                        this.showItemDetails(selectedItem);
                    }
                }
            });
        });

        const closeButton: Element | null = this.shadowRoot.querySelector(".close");
        if (closeButton) {
            closeButton.addEventListener("click", () => this.closeModal());
        }
    }

    private showItemDetails(item: { name: string; imageUrl: string; description: string }): void {
        this._selectedItem = item;
        this.render();
    }

    private closeModal(): void {
        this._selectedItem = null;
        this.render();
    }
}
