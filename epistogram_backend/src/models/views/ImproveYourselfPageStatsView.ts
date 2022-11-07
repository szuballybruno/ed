import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class ImproveYourselfPageStatsView {
    
    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    mostProductiveTimeRange: string;

    @XViewColumn()
    mostActiveDay: string;
}