import { Id } from '@episto/commontypes';
import { XViewColumn } from '../../services/XORM/XORMDecorators';


export class UserPerformanceComparisonStatsView {

    @XViewColumn()
    
    userId: Id<'User'>;

    @XViewColumn()
    
    companyId: Id<'Company'>;

    @XViewColumn()
    
    userPerformanceAverage: number;

    @XViewColumn()
    
    engagementPoints: number;

    @XViewColumn()
    
    watchedVideosCount: number;

    @XViewColumn()
    
    creationDate: Date;

    @XViewColumn()
    
    isAnyCourseRequiredOrStarted: number;
}
