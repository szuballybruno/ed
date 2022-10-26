import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class UserSessionView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    sessionStartDate: Date;

    @XViewColumn()
    sessionEndDate: Date;
}
