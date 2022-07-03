export class RecomendedItemQuotaDTO {
    isDeadlineSet: boolean;
    previsionedCompletionDate: Date;
    recommendedItemsPerDay: number;
    recommendedItemsPerWeek: number;
    completedToday: number;
    completedThisWeek: number;
}