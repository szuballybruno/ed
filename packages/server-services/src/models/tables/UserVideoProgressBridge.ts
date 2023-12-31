import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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