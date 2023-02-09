import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class ExamCompletion {

    @XViewColumn()
    id: Id<'ExamCompletion'>;

    @XViewColumn()
    completionDate: Date;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;
}