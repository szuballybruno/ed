import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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