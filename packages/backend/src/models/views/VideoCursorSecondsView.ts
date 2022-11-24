import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class VideoCursorSecondsView {

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    toSeconds: number;
}