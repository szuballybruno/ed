import { TempomatModeType } from "@episto/commontypes";

export class RecommendedItemQuotaDTO {
    isDeadlineSet: boolean;
    tempomatMode: TempomatModeType;
    previsionedCompletionDate: Date | null;
    recommendedItemsPerDay: number | null;
    recommendedItemsPerWeek: number | null;
    completedToday: number;
    completedThisWeek: number;
}