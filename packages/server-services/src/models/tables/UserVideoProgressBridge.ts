import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserVideoProgressBridge {

    @XViewColumn()
    id: Id<'UserVideoProgressBridge'>;

    @XViewColumn()
    cursorSeconds: number;

    @XViewColumn()
    completedPercentage: number;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;
}