import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

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