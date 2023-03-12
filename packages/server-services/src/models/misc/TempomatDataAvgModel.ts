import { TempoRatingType } from "@episto/commontypes";
import { Id } from "@episto/x-core";

export type TempomatDataAvgModel = {
    userId?: Id<'User'>,
    tempoPercentage: number,
    tempoRating: TempoRatingType;
}