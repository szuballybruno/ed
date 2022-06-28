export class UserLearningPageStatsDTO {
    userId: number;
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