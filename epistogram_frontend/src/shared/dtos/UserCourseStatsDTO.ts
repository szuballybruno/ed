import { TempomatModeType } from '../../shared/types/sharedTypes';
import { Id } from '../types/versionId';

export class UserCourseStatsDTO {
    userId: Id<'User'>;
    courseId: Id<'Course'>;
    thumbnailImageUrl: string;
    courseName: string;
    startDate: Date;
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
    requiredCompletionDate: Date;
    tempomatMode: TempomatModeType;
}