import { Id } from '@episto/commontypes';

export class UserLearningPageStatsDTO {
    userId: Id<'User'>;
    userEmail: string;
    totalLagBehindPercentage: number | null;
    videosToBeRepeatedCount: number;
    questionsToBeRepeatedCount: number;
    completedVideoCount: number;
    totalSessionLengthSeconds: number;
    answeredQuestionsCount: number;
    totalCorrectAnswerRate: number;
    rankInsideCompany: number;
}