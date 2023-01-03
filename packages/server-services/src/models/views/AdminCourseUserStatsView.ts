import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class AdminCourseUserStatsView {

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    firstName: string;

    @XViewColumn()
    lastName: string;

    @XViewColumn()
    avatarUrl: string;

    @XViewColumn()
    completedPercentage: number;

    @XViewColumn()
    completedVideoCount: number;

    @XViewColumn()
    completedExamCount: number;

    @XViewColumn()
    videoCount: number;

    @XViewColumn()
    examCount: number;

    @XViewColumn()
    totalSpentSeconds: number;

    @XViewColumn()
    finalExamScorePercentage: number;

    @XViewColumn()
    completionDate: Date;
}