import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class UserSessionDailyView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    sessionCount: number;
}