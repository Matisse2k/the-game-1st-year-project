import { BaseRouteService } from "./BaseRouteService";

type PlaatjeResponse = {
    plaatje: boolean;
};

export class PlattegrondService extends BaseRouteService {
    /**
     * Fetch the plaatje from the backend
     *
     * @returns The plaatje
     */
    public async fetchPlaatje(): Promise<boolean> {
        const response: PlaatjeResponse = await this.getJsonApi<PlaatjeResponse>("Chiel/check-plaatje");

        return response.plaatje;
    }
}
