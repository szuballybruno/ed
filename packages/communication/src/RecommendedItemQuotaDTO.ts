
export class RecommendedItemQuotaDTO {
    isDeadlineSet: boolean;
    tempomatMode: string;
    previsionedCompletionDate: Date | null;
    recommendedItemsPerDay: number | null;
    recommendedItemsPerWeek: number | null;
    completedToday: number;
    completedThisWeek: number;
}