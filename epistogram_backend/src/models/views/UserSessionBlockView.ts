import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';



export class UserSessionBlockView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    averageSessionBlock: string;
}