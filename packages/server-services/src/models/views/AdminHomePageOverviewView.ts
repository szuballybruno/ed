import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class AdminHomePageOverviewView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    title: string;

    @XViewColumn()
    thumbnailUrl: string;

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