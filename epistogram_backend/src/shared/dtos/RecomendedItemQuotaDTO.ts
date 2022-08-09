export class RecomendedItemQuotaDTO {
    isDeadlineSet: boolean;
    previsionedCompletionDate: Date | null;
    recommendedItemsPerDay: number;
    recommendedItemsPerWeek: number;
    completedToday: number;
    completedThisWeek: number;
}