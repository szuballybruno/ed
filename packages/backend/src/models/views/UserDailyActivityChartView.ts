import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class UserDailyActivityChartView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    totalSessionLengthSeconds: number;

    @XViewColumn()
    dayOfTheWeek: number;
}