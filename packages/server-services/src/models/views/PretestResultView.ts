import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class PretestResultView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    scorePercentage: number;

    @XViewColumn()
    completionDate: Date;
}