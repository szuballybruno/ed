import { TempomatModeType, TempoRatingType } from "@episto/commontypes";
import { Id } from "@thinkhub/x-core"

export type TempomatDataModel = {
    requiredCompletionDate: Date | null,
    originalPrevisionedCompletionDate: Date,
    estimatedCompletionDate: Date,
    recommendedItemsPerDay: number,
    recommendedItemsPerWeek: number,
    userPerformancePercentage: number,
    userId: Id<'User'>,
    lagBehindDays: number,
    avgItemCompletionPerDay: number,
    avgItemCompletionPercentagePerDay: number;
    recommendedPercentPerDay: number;
    isStartedCourse: boolean;
    tempomatMode: TempomatModeType;
    tempoRating: TempoRatingType;
    courseId: Id<'Course'>;
}