import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class CorrectAnswerRatesSplitView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    examCorrectAnswerRate: number;

    @XViewColumn()
    practiseCorrectAnswerRate: number;

    @XViewColumn()
    videoCorrectAnswerRate: number;
}