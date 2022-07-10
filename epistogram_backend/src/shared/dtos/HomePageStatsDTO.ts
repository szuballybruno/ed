import { User } from "../../models/entity/User";

export class HomePageStatsDTO {
    userId: Id<User>;
    videosToBeRepeatedCount: number;
    completedVideosLastMonth: number;
    lagBehindPercentage: number;
    performanceLastMonth: number;
}