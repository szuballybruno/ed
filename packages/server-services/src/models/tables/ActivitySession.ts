import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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