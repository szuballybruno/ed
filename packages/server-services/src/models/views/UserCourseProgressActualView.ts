import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class UserCourseProgressActualView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    totalCompletedItemCount: number;

    @XViewColumn()
    avgCompletedItemsPerDay: number;

    @XViewColumn()
    completedPercentage: number;

    @XViewColumn()
    remainingItemCount: number;

    @XViewColumn()
    totalItemCount: number;
}