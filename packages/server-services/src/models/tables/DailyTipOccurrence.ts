import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class DailyTipOccurrence {

    @XViewColumn()
    id: Id<'DailyTipOccurrence'>;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    dailyTipId: Id<'DailyTip'>;

    @XViewColumn()
    userId: Id<'User'>;
}