import { TempoRatingType } from "@episto/commontypes";
import { Id } from "@episto/x-core";

export type UserPerformancePercentageAverageModel = {
    userId: Id<'User'>,
    averageUserPerformancePercentage: number;
    tempoRating: TempoRatingType;
}