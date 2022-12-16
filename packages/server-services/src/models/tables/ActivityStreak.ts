import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class ActivityStreak {

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
}