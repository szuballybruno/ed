import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class UserSessionView {

    @XViewColumn()
    userId: Id<'User'>;

    // TODO
    sessionStartDate: Date;

    // TODO
    sessionEndDate: Date;
}
