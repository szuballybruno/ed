import { Course } from "../../models/entity/course/Course";
import { User } from "../../models/entity/User";
import { Video } from "../../models/entity/video/Video";
import { Id } from "../types/versionId";

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