import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class FinalExamScoreView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    finalExamScorePercentage: number;
}