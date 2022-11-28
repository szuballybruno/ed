import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';



export class UserPerformanceView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    performancePercentage: number;
}