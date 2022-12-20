import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class GivenAnswerView {

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    answerVersionId: Id<'AnswerVersion'>;

    @XViewColumn()
    answerId: Id<'Answer'>;

    @XViewColumn()
    isCorrect: boolean;
}