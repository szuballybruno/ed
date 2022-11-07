import { Id } from '@episto/commontypes';

export class UserVideoStatsDTO {
    userId: Id<'User'>;
    videoId: Id<'Video'>;
    videoTitle: string;
    courseId: Id<'Course'>;
    lengthSeconds: number;
    totalSpentTimeSeconds: number;
    videoReplaysCount: number;
    isRecommendedForRetry: boolean;
    lastThreeAnswerAverage: number;
    averageReactionTime: number;
    lastWatchTime: Date;
}