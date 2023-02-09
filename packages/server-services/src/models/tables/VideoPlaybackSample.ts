import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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