import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class ImproveYourselfPageStatsView {
    
    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    mostProductiveTimeRange: string;

    @XViewColumn()
    mostActiveDay: string;
}