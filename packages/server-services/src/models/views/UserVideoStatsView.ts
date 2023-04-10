import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class UserVideoStatsView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    lengthSeconds: number;

    @XViewColumn()
    videoTitle: string;

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