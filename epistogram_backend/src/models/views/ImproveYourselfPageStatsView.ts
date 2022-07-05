import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ImproveYourselfPageStatsView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    mostProductiveTimeRange: string;

    @ViewColumn()
    @XViewColumn()
    mostActiveDay: string;
}