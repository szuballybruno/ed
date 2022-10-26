import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class UserSessionDailyView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    sessionCount: number;
}
