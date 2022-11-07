import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';



export class UserModulePerformanceView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    performancePercentage: number;
}