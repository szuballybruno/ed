import { TempomatModeType } from '../../shared/types/sharedTypes';
import { Id } from '../types/versionId';

export class UserCourseStatsDTO {
    userId: Id<'User'>;
    courseId: Id<'Course'>;
    thumbnailImageUrl: string;
    courseName: string;
    startDate: Date;
    isAccessible: boolean;
    isAssigned: boolean;
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
    requiredCompletionDate: Date;
    tempomatMode: TempomatModeType;
    recommendedItemsPerWeek: number | null;
    lagBehindPercentage: number | null;
    previsionedCompletionDate: Date | null;
}