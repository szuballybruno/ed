import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserVideoStatsView {

    @XViewColumn()
    @ViewColumn()
    userId: number;

    @XViewColumn()
    @ViewColumn()
    videoId: number;

    @XViewColumn()
    @ViewColumn()
    videoTitle: string;

    @XViewColumn()
    @ViewColumn()
    courseId: number;

    @XViewColumn()
    @ViewColumn()
    lengthSeconds: number;

    @XViewColumn()
    @ViewColumn()
    totalSpentTimeSeconds: number;

    @XViewColumn()
    @ViewColumn()
    videoReplaysCount: number;

    @XViewColumn()
    @ViewColumn()
    isRecommendedForRetry: boolean;

    @XViewColumn()
    @ViewColumn()
    lastThreeAnswerAverage: number;

    @XViewColumn()
    @ViewColumn()
    averageReactionTime: number;

    @XViewColumn()
    @ViewColumn()
    lastWatchTime: Date;
}