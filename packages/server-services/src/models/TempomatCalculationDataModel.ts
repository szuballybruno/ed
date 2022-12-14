import { TempomatModeType, UserPerformanceRating } from "@episto/commontypes";
import { Id } from "@episto/x-core"

export type TempomatDataModel = {
    originalEstimatedCompletionDate: Date,
    estimatedCompletionDate: Date | null,
    requiredCompletionDate: Date | null,
    startDate: Date | null,
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
    performanceRating: UserPerformanceRating;
}