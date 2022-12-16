import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class ExamCompletion {

    @XViewColumn()
    id: Id<'ExamCompletion'>;

    @XViewColumn()
    completionDate: Date;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;
}