import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserVideoStatsView {

    @XViewColumn()
    @ViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    @ViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    @ViewColumn()
    videoTitle: string;

    @XViewColumn()
    @ViewColumn()
    courseId: Id<'Course'>;

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