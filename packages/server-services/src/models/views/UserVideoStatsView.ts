import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';


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