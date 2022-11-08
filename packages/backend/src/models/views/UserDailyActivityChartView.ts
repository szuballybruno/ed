import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';


export class UserDailyActivityChartView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    totalSessionLengthSeconds: number;

    @XViewColumn()
    dayOfTheWeek: number;
}