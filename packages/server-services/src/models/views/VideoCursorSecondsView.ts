import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class VideoCursorSecondsView {

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    toSeconds: number;
}