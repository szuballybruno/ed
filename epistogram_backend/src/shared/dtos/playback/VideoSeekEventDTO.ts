import { VideoPlaybackSession } from "../../../models/entity/playback/VideoPlaybackSession";
import { VideoVersion } from "../../../models/entity/video/VideoVersion";
import { Id } from "../../types/versionId";

export class VideoSeekEventDTO {
    fromSeconds: number;
    toSeconds: number;
    videoPlaybackSessionId: Id<'VideoPlaybackSession'>;
    videoVersionId: Id<'VideoVersion'>;
}