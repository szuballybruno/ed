import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class ActivitySession {

    @XViewColumn()
    id: Id<'ActivitySession'>;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    endDate: Date;

    @XViewColumn()
    isFinalized: boolean;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    activityStreakId: Id<'ActivityStreak'> | null;
}