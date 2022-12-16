import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

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