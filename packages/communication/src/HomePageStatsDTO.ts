import { Id } from '@episto/commontypes';

export class HomePageStatsDTO {
    userId: Id<'User'>;
    videosToBeRepeatedCount: number;
    completedVideosLastMonth: number;
    lagBehindPercentage: number | null;
    performanceLastMonth: number;
}