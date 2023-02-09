import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class AnswerVersion {

    @XViewColumn()
    id: Id<'AnswerVersion'>;

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    answerId: Id<'Answer'>;

    @XViewColumn()
    answerDataId: Id<'AnswerData'>;
}