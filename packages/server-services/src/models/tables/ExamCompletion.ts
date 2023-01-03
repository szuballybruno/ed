import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class ExamCompletion {

    @XViewColumn()
    id: Id<'ExamCompletion'>;

    @XViewColumn()
    completionDate: Date;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;
}