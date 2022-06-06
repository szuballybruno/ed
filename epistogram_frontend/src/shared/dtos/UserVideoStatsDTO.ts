export class UserVideoStatsDTO {
    userId: number;
    videoId: number;
    videoTitle: string;
    courseId: number;
    lengthSeconds: number;
    totalSpentTimeSeconds: number;
    videoReplaysCount: number;
    isRecommendedForRetry: boolean;
    lastThreeAnswerAverage: number;
    averageReactionTime: number;
    lastWatchTime: Date;
}