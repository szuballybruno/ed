import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { ActivityStreak } from '../entity/ActivityStreak';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ActivityStreakView {

    @ViewColumn()
    @XViewColumn()
    id: Id<'ActivityStreak'>;

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    startDate: Date;

    @ViewColumn()
    @XViewColumn()
    endDate: Date;

    @ViewColumn()
    @XViewColumn()
    isFinalized: boolean;

    @ViewColumn()
    @XViewColumn()
    length_days: number;
}
