import { Id } from '@episto/commontypes';
import { CourseLearningDTO } from './CourseLearningDTO';
import { UserProgressChartStep } from './UserProgressChartStep';

export class UserLearningOverviewDataDTO {
    userId: Id<'User'>;

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
    userReactionTimeDifferencePercentage: number;
    correctAnswerRatePercentage: number;
    averageWatchedVideosPerDay: number;

    userProgressData: UserProgressChartStep[];

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