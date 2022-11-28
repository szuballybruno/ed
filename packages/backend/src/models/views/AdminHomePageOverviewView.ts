import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class AdminHomePageOverviewView {

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    thumbnailUrl: string;

    @XViewColumn()
    title: string;

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
