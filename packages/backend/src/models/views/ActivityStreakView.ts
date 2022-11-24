import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class ActivityStreakView {

    @XViewColumn()
    id: Id<'ActivityStreak'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    endDate: Date;

    @XViewColumn()
    isFinalized: boolean;

    @XViewColumn()
    length_days: number;
}
