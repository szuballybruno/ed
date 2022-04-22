import { UserCourseProgressChartDTO } from './UserCourseProgressChartDTO';

export class getUserLearningOverviewData {
    userId: number;

    overallPerformancePercentage: number;

    engagementPercentage: number;
    performancePercentage: number;
    productivityPercentage: number;
    deepeningPercentage: number;
    socialActivityPercentage: number;

    spentActiveTimeSeconds: number;
    watchedVideosCount: number;

    answeredQuizQuestionsCount: number;
    correctAnswersCount: number;
    averageReactionTimeSeconds: number;
    averageDailyWatchedVideosCount: number;

    userProgressData: UserCourseProgressChartDTO;

    userActivityDistributionData: {
        watchingVideosPercentage: number,
        completingExamsPercentage: number,
        answeringQuestionsPercentage: number,
        noActivityPercentage: number
    };

    mostActiveTimeRange: string;
    completedExamsCount: number;
    averageSessionLengthSeconds: number;
    videosToRepeatCount: number;
}