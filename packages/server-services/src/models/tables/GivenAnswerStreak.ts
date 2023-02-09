import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class GivenAnswerStreak {

    @XViewColumn()
    id: Id<'GivenAnswerStreak'>;

    @XViewColumn()
    isFinalized: boolean;

    @XViewColumn()
    userId: Id<'User'>;
}