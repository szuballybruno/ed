import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

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