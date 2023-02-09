import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class VideoSeekEvent {

    @XViewColumn()
    id: Id<'VideoSeekEvent'>;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    fromSeconds: number;

    @XViewColumn()
    toSeconds: number;

    @XViewColumn()
    isForward: boolean;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    videoPlaybackSessionId: Id<'VideoPlaybackSession'>;
}