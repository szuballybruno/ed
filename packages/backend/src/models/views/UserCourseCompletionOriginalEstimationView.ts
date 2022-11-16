import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';


export class UserCourseCompletionOriginalEstimationView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    previsionedItemsPerDay: number;

    @XViewColumn()
    previsionedDurationDays: number;

    @XViewColumn()
    previsionedCompletionDate: Date;
}