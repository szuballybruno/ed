import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserPerformanceAnswerGroupView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    examCorrectAnswerRate: number;

    @XViewColumn()
    practiseCorrectAnswerRate: number;

    @XViewColumn()
    videoCorrectAnswerRate: number;
}