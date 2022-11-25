import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class UserSessionDailyView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    sessionCount: number;
}
