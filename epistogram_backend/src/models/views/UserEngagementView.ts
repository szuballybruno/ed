import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';



export class UserEngagementView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    engagementPoints: number;
}