import { User } from "../../models/entity/User";
import { Id } from "../types/versionId";

export class UserLearningPageStatsDTO {
    userId: Id<User>;
    userEmail: string;
    totalLagBehindPercentage: number;
    videosToBeRepeatedCount: number;
    questionsToBeRepeatedCount: number;
    completedVideoCount: number;
    totalSessionLengthSeconds: number;
    answeredQuestionsCount: number;
    totalCorrectAnswerRate: number;
    rankInsideCompany: number;
}