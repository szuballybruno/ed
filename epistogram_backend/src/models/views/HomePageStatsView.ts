import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class HomePageStatsView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    videosToBeRepeatedCount: number;

    @ViewColumn()
    @XViewColumn()
    completedVideosLastMonth: number;

    @ViewColumn()
    @XViewColumn()
    performanceLastMonth: number;
}