import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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