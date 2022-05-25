import { TempomatModeType } from '../../shared/types/sharedTypes';

export class UserCourseStatsDTO {
    userId: number;
    courseId: number;
    differenceFromAveragePerformancePercentage: number;
    courseProgressPercentage: number;
    performancePercentage: number;
    completedVideoCount: number;
    completedExamCount: number;
    totalSpentSeconds: number;
    averagePerformanceOnCourse: number;
    answeredVideoQuestionCount: number;
    answeredPractiseQuestionCount: number;
    isFinalExamCompleted: boolean;
    recommendedItemsPerWeek: number;
    lagBehindPercentage: number;
    previsionedCompletionDate: Date;
    tempomatMode: TempomatModeType;
}