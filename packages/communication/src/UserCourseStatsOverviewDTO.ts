import { Id, UserActivityDistributionChartData, TempoRatingType } from '@episto/commontypes';
import { UserProgressChartStep } from './UserProgressChartStep';

export class UserCourseStatsOverviewDTO {
    userId: Id<'User'>;
    courseId: Id<'Course'>;
    courseName: string;
    startDate: Date;
    courseProgressPercentage: number;
    correctAnswerRate: number;
    totalSpentSeconds: number;
    completedVideoCount: number;
    answeredVideoQuestionCount: number;
    answeredPractiseQuestionCount: number;
    userActivityDistributionChartData: UserActivityDistributionChartData;
    progressChartData: UserProgressChartStep[];
    tempoPercentage: number;
    tempoRating: TempoRatingType;
}
