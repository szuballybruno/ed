import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class LatestGivenAnswerView {

    @XViewColumn()
    givenAnswerId: Id<'GivenAnswer'>;

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    userId: Id<'User'>;
}