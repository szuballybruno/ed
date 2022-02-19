export class UserStatsDTO {
    userId: number;
    userEmail: string;
    completedVideoCount: number;
    completedExamCount: number;
    successfulExamCount: number;
    totalVideoPlaybackSeconds: number;
    totalGivenAnswerCount: number;
    totalCorrectGivenAnswerCount: number;
    totalSessionLengthSeconds: number;
    averageSessionLengthSeconds: number;
    totalAnswerSessionSuccessRate: number;
    totalCorrectAnswerRate: number;
    totalSuccessfulExamRate: number;
}