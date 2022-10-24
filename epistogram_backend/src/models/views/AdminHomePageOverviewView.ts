import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { ViewColumn, ViewEntity } from '../MyORM';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AdminHomePageOverviewView {

    @ViewColumn()
    @XViewColumn()
    companyId: Id<'Company'>;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    @XViewColumn()
    activeUsersCount: number;

    @ViewColumn()
    @XViewColumn()
    suspendedUsersCount: number;

    @ViewColumn()
    @XViewColumn()
    completedUsersCount: number;

    @ViewColumn()
    @XViewColumn()
    avgCoursePerformancePercentage: number;

    @ViewColumn()
    @XViewColumn()
    difficultVideosCount: number;

    @ViewColumn()
    @XViewColumn()
    questionsWaitingToBeAnswered: number;
}
