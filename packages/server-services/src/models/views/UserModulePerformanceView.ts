import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class UserModulePerformanceView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    givenAnswerCount: number;

    @XViewColumn()
    summarizedMaxScore: number;

    @XViewColumn()
    summarizedScore: number;

    @XViewColumn()
    performancePercentage: number;
}