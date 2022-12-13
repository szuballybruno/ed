import { Id } from "@episto/x-core"

export type TempomatCalculationDataModel = {
    previsionedCompletionDate: Date | null,
    requiredCompletionDate: Date | null,
    startDate: Date | null,
    recommendedItemsPerDay: number,
    recommendedItemsPerWeek: number,
    originalPrevisionedCompletionDate: Date,
    userPerformancePercentage: number,
    userId: Id<'User'>,
    lagBehindDays: number,
    avgItemCompletionPerDay: number,
    avgItemCompletionPercentagePerDay: number;
    recommendedPercentPerDay: number;
    isStartedCourse: boolean;
}