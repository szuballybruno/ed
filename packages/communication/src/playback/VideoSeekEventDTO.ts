import { Id } from '@episto/commontypes';

export class VideoSeekEventDTO {
    fromSeconds: number;
    toSeconds: number;
    videoPlaybackSessionId: Id<'VideoPlaybackSession'>;
    videoVersionId: Id<'VideoVersion'>;
}