import { Id } from "../../types/versionId";

export type VideoPlaybackSampleDTO = {
    fromSeconds: number;
    toSeconds: number;
    videoPlaybackSessionId: Id<'VideoPlaybackSession'>;
    videoVersionId: Id<'VideoVersion'>;
}