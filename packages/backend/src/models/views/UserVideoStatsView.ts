import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class UserVideoStatsView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    videoTitle: string;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    lengthSeconds: number;

    @XViewColumn()
    totalSpentTimeSeconds: number;

    @XViewColumn()
    videoReplaysCount: number;

    @XViewColumn()
    isRecommendedForRetry: boolean;

    @XViewColumn()
    lastThreeAnswerAverage: number;

    @XViewColumn()
    averageReactionTime: number;

    @XViewColumn()
    lastWatchTime: Date;
}