import { TempomatModeType } from "@episto/commontypes";

export class CourseProgressOverviewDTO {
    deadlineDate: Date | null;
    tempomatMode: TempomatModeType;
    estimatedCompletionDate: Date | null;
    recommendedItemsPerDay: number;
    recommendedItemsPerWeek: number;
    completedToday: number;
    completedThisWeek: number;
}