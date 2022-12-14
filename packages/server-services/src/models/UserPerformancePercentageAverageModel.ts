import { UserPerformanceRating } from "@episto/commontypes";
import { Id } from "@episto/x-core";

export type UserPerformancePercentageAverageModel = {
    userId: Id<'User'>,
    averageUserPerformancePercentage: number;
    performanceRating: UserPerformanceRating;
}