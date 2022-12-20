import { TempoRatingType } from "@episto/commontypes";
import { Id } from "@thinkhub/x-core";

export type TempomatDataAvgModel = {
    userId?: Id<'User'>,
    tempoPercentage: number,
    tempoRating: TempoRatingType;
}