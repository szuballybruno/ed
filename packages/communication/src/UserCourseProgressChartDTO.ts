import { EpistoLineChartDataType } from "@episto/commontypes";

export class UserCourseProgressChartDTO {
    dates: string[];
    previsionedProgress: EpistoLineChartDataType;
    actualProgress: EpistoLineChartDataType;
}