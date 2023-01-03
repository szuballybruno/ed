import { TempomatModeType } from "@episto/commontypes";

export class CourseProgressOverviewDTO {
    deadlineDate: Date | null;
    tempomatMode: TempomatModeType;
    estimatedCompletionDate: Date;
    recommendedItemsPerDay: number;
    recommendedItemsPerWeek: number;
    completedToday: number;
    completedThisWeek: number;
}