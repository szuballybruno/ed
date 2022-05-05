import { CourseLearningDTO } from './CourseLearningDTO';
import { UserCourseProgressChartDTO } from './UserCourseProgressChartDTO';

export class UserLearningOverviewDataDTO {
    userId: number;

    overallPerformancePercentage: number;

    engagementPoints: number;
    performancePercentage: number;
    productivityPercentage: number;
    socialActivityPercentage: number;
    reactionTimeScorePoints: number;

    isAnyCoursesInProgress: boolean;
    inProgressCourses: CourseLearningDTO[];

    totalTimeActiveOnPlatformSeconds: number;
    watchedVideos: number;

    answeredVideoAndPractiseQuizQuestions: number;
    correctAnsweredVideoAndPractiseQuizQuestions: number;
    userReactionTimeDifferenceSeconds: number;
    correctAnswerRatePercentage: number;
    averageWatchedVideosPerDay: number;

    userProgressData: UserCourseProgressChartDTO;

    userActivityDistributionData: {
        watchingVideosPercentage: number,
        completingExamsPercentage: number,
        answeringQuestionsPercentage: number,
        noActivityPercentage: number
    };

    mostFrequentTimeRange: string;
    averageSessionLengthSeconds: number;
    totalDoneExams: number;
    videosToBeRepeatedCount: number;
}