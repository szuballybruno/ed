import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';



export class UserInactiveCourseView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    inactiveCourseCount: number;
}