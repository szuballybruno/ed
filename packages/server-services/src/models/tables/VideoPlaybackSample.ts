import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class VideoPlaybackSample {

    @XViewColumn()
    id: Id<'VideoPlaybackSample'>;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    fromSeconds: number;

    @XViewColumn()
    toSeconds: number;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    videoPlaybackSessionId: Id<'VideoPlaybackSession'>;
}