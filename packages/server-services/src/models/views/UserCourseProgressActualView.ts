import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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