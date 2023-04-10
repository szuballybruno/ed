import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class GivenAnswerStreak {

    @XViewColumn()
    id: Id<'GivenAnswerStreak'>;

    @XViewColumn()
    isFinalized: boolean;

    @XViewColumn()
    userId: Id<'User'>;
}