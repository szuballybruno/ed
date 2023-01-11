import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class FinalExamScoreView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    finalExamScorePercentage: number;
}