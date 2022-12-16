import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

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