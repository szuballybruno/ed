import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class LatestGivenAnswerView {

    @XViewColumn()
    givenAnswerId: Id<'GivenAnswer'>;

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    userId: Id<'User'>;
}