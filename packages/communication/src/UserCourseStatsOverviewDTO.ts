import { Id, UserActivityDistributionChartData, TempoRatingType } from '@episto/commontypes';
import { UserCourseProgressChartDTO } from './UserCourseProgressChartDTO';
import { UserProgressChartStep } from './UserProgressChartStep';

export class UserCourseStatsOverviewDTO {
    userId: Id<'User'>;
    courseId: Id<'Course'>;
    courseName: string;
    startDate: Date;
    performancePercentage: number;
    courseProgressPercentage: number;
    correctAnswerRate: number;
    totalSpentSeconds: number;
    completedVideoCount: number;
    answeredVideoQuestionCount: number;
    answeredPractiseQuestionCount: number;

    userActivityDistributionChartData: UserActivityDistributionChartData;
    progressChartData: UserCourseProgressChartDTO | null;
}
