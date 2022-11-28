import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';



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