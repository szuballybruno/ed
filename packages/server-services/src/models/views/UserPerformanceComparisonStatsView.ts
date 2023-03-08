import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserPerformanceComparisonStatsView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    isAnyCourseRequiredOrStarted: boolean;

    @XViewColumn()
    userPerformanceAverage: number;

    @XViewColumn()
    engagementPoints: number;

    @XViewColumn()
    watchedVideosCount: number;
}