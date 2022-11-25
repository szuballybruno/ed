import { XViewColumn } from '@episto/xorm';
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