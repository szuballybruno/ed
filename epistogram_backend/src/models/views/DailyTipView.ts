import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class DailyTipView {

    @ViewColumn()
    @XViewColumn()
    dailyTipId: number;

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    description: string;

    @ViewColumn()
    @XViewColumn()
    videoFilePath: string;

    @ViewColumn()
    @XViewColumn()
    lastOccurrenceDate: Date;

    @ViewColumn()
    @XViewColumn()
    isNew: boolean;

    @ViewColumn()
    @XViewColumn()
    isCurrentTip: boolean;
}