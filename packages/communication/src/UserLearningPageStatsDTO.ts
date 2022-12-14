import { Id, UserPerformanceRating } from '@episto/commontypes';

export class UserLearningPageStatsDTO {
    userId: Id<'User'>;
    userEmail: string;
    userPerformancePercentage: number;
    userPerormanceRating: UserPerformanceRating;
    videosToBeRepeatedCount: number;
    questionsToBeRepeatedCount: number;
    completedVideoCount: number;
    totalSessionLengthSeconds: number;
    answeredQuestionsCount: number;
    totalCorrectAnswerRate: number;
    rankInsideCompany: number;
}