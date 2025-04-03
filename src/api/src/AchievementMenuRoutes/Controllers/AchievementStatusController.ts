import { Request, Response } from "express";
import { gameService } from "../../global";

type AchievementStatuses = {
    ghostQuest: string;
    chefQuest: string;
    quizQuest: string;
    doorQuest: string;
    endingQuest: string;
    // Voeg hier andere quests toe
};

export class AchievementStatusController {
    public checkAllStatuses(_: Request, res: Response): void {
        const statuses: AchievementStatuses = {
            ghostQuest: this.getStatus(gameService.getPlayerSession().GhostQuestCompleted, gameService.getPlayerSession().GhostQuestStarted),
            chefQuest: this.getStatus(gameService.getPlayerSession().ChefQuestCompleted, gameService.getPlayerSession().ChefQuestStarted),
            endingQuest: this.getStatus(gameService.getPlayerSession().secretEndingStarted, gameService.getPlayerSession().HatchOpened ?? false),
            quizQuest: this.getQuizStatus(gameService.getPlayerSession().quizCompleted, gameService.getPlayerSession().confirmingWalkToGuardQuiz),
            doorQuest: this.getDoorStatus(gameService.getPlayerSession().guestaticdooropen || gameService.getPlayerSession().guestaticdooropen),

            // Voeg hier andere quests toe
        };
        res.json(statuses);
    }

    private getStatus(completed: boolean, started: boolean): string {
        if (completed) {
            return "completed";
        }
        else if (started) {
            return "active";
        }
        else {
            return "inactive";
        }
    }

    private getQuizStatus(completed: boolean, started: boolean): string {
        if (completed && gameService.getPlayerSession().incorrectAnswers === 0) {
            return "completed";
        }
        else if (started) {
            return "active";
        }
        else {
            return "inactive";
        }
    }

    private getDoorStatus(completed: boolean): string {
        if (completed) {
            return "completed";
        }

        else {
            return "inactive";
        }
    }
}
