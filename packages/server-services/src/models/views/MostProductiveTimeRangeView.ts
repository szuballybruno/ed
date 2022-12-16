import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class MostProductiveTimeRangeView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    sessionBlock: string;

    @XViewColumn()
    performancePercentage: number;
}