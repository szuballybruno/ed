import { Id } from "@episto/x-core"

export type TempomatCalculationDataModel = {
    previsionedCompletionDate: Date | null,
    requiredCompletionDate: Date | null,
    recommendedItemsPerDay: number,
    recommendedItemsPerWeek: number,
    originalPrevisionedCompletionDate: Date,
    startDate: Date,
    userPerformancePercentage: number,
    userId: Id<'User'>,
    lagBehindDays: number,
    avgItemCompletionPerDay: number,
    avgItemCompletionPercentagePerDay: number;
    recommendedPercentPerDay: number;
}