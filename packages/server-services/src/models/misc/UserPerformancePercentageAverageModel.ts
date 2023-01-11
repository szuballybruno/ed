import { TempoRatingType } from "@episto/commontypes";
import { Id } from "@thinkhub/x-core";

export type UserPerformancePercentageAverageModel = {
    userId: Id<'User'>,
    averageUserPerformancePercentage: number;
    tempoRating: TempoRatingType;
}