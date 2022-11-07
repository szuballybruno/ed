import { Id } from '@episto/commontypes';

export class ImproveYourselfPageStatsDTO {
    userId: Id<'User'>;
    mostProductiveTimeRange: string;
    mostProductiveTimeRangeChartData: number[][];
    mostActiveDay: string;
    mostActiveDayChartData: any;
}