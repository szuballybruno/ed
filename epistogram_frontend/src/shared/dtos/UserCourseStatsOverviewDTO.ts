import { UserActivityDistributionChartData } from '../types/epistoChartTypes';
import { Id } from '../types/versionId';
import { UserCourseProgressChartDTO } from './UserCourseProgressChartDTO';

export class UserCourseStatsOverviewDTO {
    userId: Id<'User'>;
    courseId: Id<'Course'>;
    courseName: string;
    startDate: Date;
    performancePercentage: number;
    courseProgressPercentage: number;
    correctAnswerRate: number;
    totalSpentSeconds: number;
    totalCompletedItemCount: number;
    answeredVideoQuestionCount: number;
    answeredPractiseQuestionCount: number;

    userActivityDistributionChartData: UserActivityDistributionChartData;
    progressChartData: UserCourseProgressChartDTO;
}