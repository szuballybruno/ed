import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class UserVideoPractiseProgressView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    playbackDuration: number;

    @XViewColumn()
    lengthSeconds: number;

    @XViewColumn()
    watchPercentage: number;
}