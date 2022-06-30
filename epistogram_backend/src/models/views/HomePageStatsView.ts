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
    completedVideosLastMonth: number;

    @ViewColumn()
    @XViewColumn()
    playbackTimeLastMonth: number;

    @ViewColumn()
    @XViewColumn()
    totalGivenAnswerCount: number;

    @ViewColumn()
    @XViewColumn()
    correctAnswerRate: number;
}