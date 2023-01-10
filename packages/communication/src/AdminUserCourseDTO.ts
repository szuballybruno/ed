import { Id, PerformanceRatingType, TempomatModeType, TempoRatingType } from '@episto/commontypes';

export class AdminUserCourseDTO {
    userId: Id<'User'>;
    courseId: Id<'Course'>;
    thumbnailImageUrl: string;
    courseName: string;
    startDate: Date;
    isAccessible: boolean;
    isAssigned: boolean;
    courseProgressPercentage: number;
    completedVideoCount: number;
    completedExamCount: number;
    totalSpentSeconds: number;
    answeredVideoQuestionCount: number;
    answeredPractiseQuestionCount: number;
    isFinalExamCompleted: boolean;
    requiredCompletionDate: Date;
    tempomatMode: TempomatModeType;
    recommendedItemsPerWeek: number | null;
    previsionedCompletionDate: Date | null;
    
    // tempo
    tempoPercentage: number;
    tempoRating: TempoRatingType;

    // performance
    performanceRating: PerformanceRatingType;
    performancePercentage: number;
}