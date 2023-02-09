import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class LatestGivenAnswerView {

    @XViewColumn()
    givenAnswerId: Id<'GivenAnswer'>;

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    userId: Id<'User'>;
}