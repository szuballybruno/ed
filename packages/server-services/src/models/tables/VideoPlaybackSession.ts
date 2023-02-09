import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class VideoPlaybackSession {

    @XViewColumn()
    id: Id<'VideoPlaybackSession'>;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    lastUsageDate: Date;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    userId: Id<'User'>;
}