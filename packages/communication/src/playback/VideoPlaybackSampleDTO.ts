import { Id } from '@episto/commontypes';

export type VideoPlaybackSampleDTO = {
    fromSeconds: number;
    toSeconds: number;
    videoPlaybackSessionId: Id<'VideoPlaybackSession'>;
    videoVersionId: Id<'VideoVersion'>;
}