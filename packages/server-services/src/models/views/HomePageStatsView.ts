import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class HomePageStatsView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    videosToBeRepeatedCount: number;

    @XViewColumn()
    completedVideosLastMonth: number;

    @XViewColumn()
    performanceLastMonth: number;
}