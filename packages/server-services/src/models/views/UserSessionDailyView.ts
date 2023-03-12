import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class UserSessionDailyView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    sessionCount: number;
}