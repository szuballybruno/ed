import { Id } from "../../types/versionId";

export class VideoSeekEventDTO {
    fromSeconds: number;
    toSeconds: number;
    videoPlaybackSessionId: Id<'VideoPlaybackSession'>;
    videoVersionId: Id<'VideoVersion'>;
}