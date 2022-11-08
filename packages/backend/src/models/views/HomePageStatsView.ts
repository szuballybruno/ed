import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';


export class HomePageStatsView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    videosToBeRepeatedCount: number;

    @XViewColumn()
    completedVideosLastMonth: number;

    @XViewColumn()
    performanceLastMonth: number;
}