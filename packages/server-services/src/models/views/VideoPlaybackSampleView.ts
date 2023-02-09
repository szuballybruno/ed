import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class VideoPlaybackSampleView {

    @XViewColumn()
    id: Id<'VideoPlaybackSample'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    fromSeconds: number;

    @XViewColumn()
    toSeconds: number;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    totalPlaybackDuration: number;
}