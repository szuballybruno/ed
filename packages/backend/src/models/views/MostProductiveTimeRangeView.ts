import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';


export class MostProductiveTimeRangeView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    sessionBlock: string;

    @XViewColumn()
    performancePercentage: number;
}
