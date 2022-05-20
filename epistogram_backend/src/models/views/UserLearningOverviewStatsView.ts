import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserLearningOverviewStatsView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    userEmail: string;

    @ViewColumn()
    overallPerformancePercentage: number;

    @ViewColumn()
    engagementPoints: number;

    @ViewColumn()
    performancePercentage: number;

    @ViewColumn()
    userExamLengthPoints: number;

    @ViewColumn()
    userReactionTimePoints: number;

    @ViewColumn()
    totalTimeActiveOnPlatformSeconds: number;

    @ViewColumn()
    watchedVideos: number;

    @ViewColumn()
    answeredVideoAndPractiseQuizQuestions: number;

    @ViewColumn()
    correctAnsweredVideoAndPractiseQuizQuestions: number;

    @ViewColumn()
    correctAnswerRatePercentage: number;

    @ViewColumn()
    userReactionTimeDifferencePercentage: number;

    @ViewColumn()
    averageWatchedVideosPerDay: number;

    @ViewColumn()
    mostFrequentTimeRange: string;

    @ViewColumn()
    averageSessionLengthSeconds: number;

    @ViewColumn()
    totalDoneExams: number;

    @ViewColumn()
    videosToBeRepeatedCount: number;
}