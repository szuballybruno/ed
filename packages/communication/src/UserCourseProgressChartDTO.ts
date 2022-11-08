import { EpistoLineChartDataType } from "@episto/commontypes";

export class UserCourseProgressChartDTO {
    dates: string[];
    originalPrevisionedProgress: EpistoLineChartDataType;
    previsionedProgress: EpistoLineChartDataType;
    actualProgress: EpistoLineChartDataType;
}