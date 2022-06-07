import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserVideoStatsView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    videoId: number;

    @ViewColumn()
    videoTitle: string;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    lengthSeconds: number;

    @ViewColumn()
    totalSpentTimeSeconds: number;

    @ViewColumn()
    videoReplaysCount: number;

    @ViewColumn()
    isRecommendedForRetry: boolean;

    @ViewColumn()
    lastThreeAnswerAverage: number;

    @ViewColumn()
    averageReactionTime: number;

    @ViewColumn()
    lastWatchTime: Date;
}