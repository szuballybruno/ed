import { Id } from "../types/versionId";

export class ImproveYourselfPageStatsDTO {
    userId: Id<'User'>;
    mostProductiveTimeRange: string;
    mostProductiveTimeRangeChartData: number[][];
    mostActiveDay: string;
    mostActiveDayChartData: any;
}