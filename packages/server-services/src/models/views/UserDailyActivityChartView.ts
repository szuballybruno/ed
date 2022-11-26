import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';


export class UserDailyActivityChartView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    totalSessionLengthSeconds: number;

    @XViewColumn()
    dayOfTheWeek: number;
}