import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class MostProductiveTimeRangeView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    sessionBlock: string;

    @XViewColumn()
    performancePercentage: number;
}
