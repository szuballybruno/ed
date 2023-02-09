import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserPerformanceView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    givenAnswerCount: number;

    @XViewColumn()
    summarizedMaxScore: number;

    @XViewColumn()
    summarizedScore: number;

    @XViewColumn()
    performancePercentage: number;
}