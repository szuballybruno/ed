import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';


export class UserModuleStatsView {

    @XViewColumn()
    
    userId: Id<'User'>;

    @XViewColumn()
    
    courseId: Id<'Course'>;

    @XViewColumn()
    
    moduleId: Id<'Module'>;

    @XViewColumn()
    
    moduleName: string;

    @XViewColumn()
    
    moduleProgress: number;

    @XViewColumn()
    
    performancePercentage: number;

    @XViewColumn()
    
    lastExamScore: number;

    @XViewColumn()
    
    moduleQuestionSuccessRate: number;

    @XViewColumn()
    
    videosToBeRepeatedCount: number;
}