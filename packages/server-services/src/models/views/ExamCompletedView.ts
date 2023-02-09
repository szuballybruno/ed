import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class ExamCompletedView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    isFinalExam: boolean;

    @XViewColumn()
    orderIndex: number;

    @XViewColumn()
    completedSessionCount: number;

    @XViewColumn()
    hasCompletedSession: boolean;

    @XViewColumn()
    successfulSessionCount: number;

    @XViewColumn()
    hasSuccessfulSession: boolean;

    @XViewColumn()
    singleSuccessfulSession: boolean;
}