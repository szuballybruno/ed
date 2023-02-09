import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserSessionDailyView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    sessionCount: number;
}