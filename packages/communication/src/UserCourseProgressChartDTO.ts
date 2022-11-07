import { EpistoLineChartDataType } from '../types/epistoChartTypes';

export class UserCourseProgressChartDTO {
    dates: string[];
    originalPrevisionedProgress: EpistoLineChartDataType;
    previsionedProgress: EpistoLineChartDataType;
    actualProgress: EpistoLineChartDataType;
}