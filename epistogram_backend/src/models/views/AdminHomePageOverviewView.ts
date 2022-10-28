import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class AdminHomePageOverviewView {

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    thumbnailUrl: string;

    @ViewColumn()
    @XViewColumn()
    title: string;

    @ViewColumn()
    @XViewColumn()
    activeUsersCount: number;

    @XViewColumn()
    suspendedUsersCount: number;

    @XViewColumn()
    completedUsersCount: number;

    @XViewColumn()
    avgCoursePerformancePercentage: number;

    @XViewColumn()
    difficultVideosCount: number;

    @XViewColumn()
    questionsWaitingToBeAnswered: number;
}
