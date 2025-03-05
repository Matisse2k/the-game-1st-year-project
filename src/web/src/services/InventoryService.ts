import { BaseRouteService } from "./BaseRouteService";

export class InventoryService extends BaseRouteService {
    /**
     * Fetch the inventory items from the backend
     *
     * @returns List of inventory items
     */
    public async fetchInventory(): Promise<string[]> {
        return this.getJsonApi<string[]>("game/inventory");
    }

    /**
     * Fetch the description of an item from the backend
     *
     * @param alias The alias of the item
     * @returns The description of the item
     */
    public async fetchItemDescription(alias: string): Promise<string> {
        const response: { description: string } = await this.getJsonApi<{ description: string }>(`game/item/${alias}/description`);
        return response.description;
    }
}
