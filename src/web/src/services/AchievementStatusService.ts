import { BaseRouteService } from "./BaseRouteService";

type StatusResponse = {
    ghostQuest: string;
    chefQuest: string;
    quizQuest: string;
    doorQuest: string;
    endingQuest: string;
    // Voeg hier andere quests toe
};

export class AchievementStatusService extends BaseRouteService {
    public async fetchAllStatuses(): Promise<StatusResponse> {
        return await this.getJsonApi<StatusResponse>("AchievementMenuRoutes/check-status");
    }
}
