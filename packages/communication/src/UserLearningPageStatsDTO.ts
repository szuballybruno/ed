import { Id, TempoRatingType } from '@episto/commontypes';

export class UserLearningPageStatsDTO {
    userId: Id<'User'>;
    userEmail: string;
    userPerformancePercentage: number;
    userPerormanceRating: TempoRatingType;
    videosToBeRepeatedCount: number;
    questionsToBeRepeatedCount: number;
    completedVideoCount: number;
    totalSessionLengthSeconds: number;
    answeredQuestionsCount: number;
    totalCorrectAnswerRate: number;
    rankInsideCompany: number;
}