import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class DailyTipView {

    @XViewColumn()
    dailyTipId: Id<'DailyTip'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    description: string;

    @XViewColumn()
    videoFilePath: string;

    @XViewColumn()
    lastOccurrenceDate: Date;

    @XViewColumn()
    isNew: boolean;

    @XViewColumn()
    isCurrentTip: boolean;
}