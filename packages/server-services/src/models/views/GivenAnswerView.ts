import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';


export class GivenAnswerView {

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    answerVersionId: Id<'AnswerVersion'>;

    @XViewColumn()
    answerId: Id<'Answer'>;

    @XViewColumn()
    isCorrect: boolean;
}