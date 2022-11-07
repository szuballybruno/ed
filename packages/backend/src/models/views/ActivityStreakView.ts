import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


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
