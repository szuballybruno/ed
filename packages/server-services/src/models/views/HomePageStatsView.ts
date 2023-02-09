import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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