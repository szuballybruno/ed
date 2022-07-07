import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserDailyActivityChartView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    totalSessionLengthSeconds: number;

    @ViewColumn()
    @XViewColumn()
    dayOfTheWeek: number;
}