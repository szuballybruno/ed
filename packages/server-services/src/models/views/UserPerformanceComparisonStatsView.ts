import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

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