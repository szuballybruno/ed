import { TempomatModeType, TempoRatingType } from "@episto/commontypes";
import { Id } from "@episto/x-core"

export type TempomatDataModel = {
    requiredCompletionDate: Date | null,
    originalEstimatedCompletionDate: Date,
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
}