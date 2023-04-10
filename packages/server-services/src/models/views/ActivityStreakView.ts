import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class ActivityStreakView {

    @XViewColumn()
    id: Id<'ActivityStreak'>;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    endDate: Date;

    @XViewColumn()
    isFinalized: boolean;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    lengthDays: number;
}