import { UserCourseProgressChartDayDTO } from "./UserCourseProgressChartDayDTO";

export class UserCourseProgressChartDTO {
    startDate: Date;
    estimatedCompletionDate: Date;
    estimatedLengthInDays: number;
    days: UserCourseProgressChartDayDTO[];
}