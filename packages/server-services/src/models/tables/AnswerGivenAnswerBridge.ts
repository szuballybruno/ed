import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class AnswerGivenAnswerBridge {

    @XViewColumn()
    id: Id<'AnswerGivenAnswerBridge'>;

    @XViewColumn()
    deletionDate: Date | null;

    @XViewColumn()
    givenAnswerId: Id<'GivenAnswer'>;

    @XViewColumn()
    answerVersionId: Id<'AnswerVersion'>;
}