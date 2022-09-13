import { ViewColumn, ViewEntity } from '../MyORM';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class DailyTipView {

    @ViewColumn()
    @XViewColumn()
    dailyTipId: Id<'DailyTip'>;

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

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