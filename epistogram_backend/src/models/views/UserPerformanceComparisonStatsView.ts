import { ViewColumn, ViewEntity } from '../MyORM';
import { Id } from '../../shared/types/versionId';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserPerformanceComparisonStatsView {

    @XViewColumn()
    @ViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    @ViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    @ViewColumn()
    userPerformanceAverage: number;

    @XViewColumn()
    @ViewColumn()
    engagementPoints: number;

    @XViewColumn()
    @ViewColumn()
    watchedVideosCount: number;

    @XViewColumn()
    @ViewColumn()
    creationDate: Date;

    @XViewColumn()
    @ViewColumn()
    isAnyCourseRequiredOrStarted: number;
}
