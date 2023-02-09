import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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