import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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