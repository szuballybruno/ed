import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class ImproveYourselfPageStatsView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    mostProductiveTimeRange: string;

    @XViewColumn()
    mostActiveDay: number;
}