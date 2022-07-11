import { User } from "../../models/entity/User";
import { Id } from "../types/versionId";

export class HomePageStatsDTO {
    userId: Id<'User'>;
    videosToBeRepeatedCount: number;
    completedVideosLastMonth: number;
    lagBehindPercentage: number;
    performanceLastMonth: number;
}