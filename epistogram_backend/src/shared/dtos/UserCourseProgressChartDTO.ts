import { UserCourseProgressChartDayDTO } from "./UserCourseProgressChartDayDTO";

export class UserCourseProgressChartDTO {
    courseLengthSeconds: number;
    estimatedSecondsPerDay: number;
    originalCompletionDaysEstimation: number;
    startDate: Date;
    estimatedCompletionDate: Date;
    estimatedLengthInDays: number;
    days: UserCourseProgressChartDayDTO[];
}