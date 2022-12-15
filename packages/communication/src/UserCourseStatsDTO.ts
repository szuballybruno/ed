import { Id, TempomatModeType, TempoRatingType } from '@episto/commontypes';

export class UserCourseStatsDTO {
    userId: Id<'User'>;
    courseId: Id<'Course'>;
    thumbnailImageUrl: string;
    courseName: string;
    startDate: Date;
    isAccessible: boolean;
    isAssigned: boolean;
    courseProgressPercentage: number;
    tempoPercentage: number;
    tempoRating: TempoRatingType;
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
}