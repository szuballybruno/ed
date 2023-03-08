import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserCourseCompletionOriginalEstimationView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    totalItemCount: number;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    estimatedMinutesPerDay: number;

    @XViewColumn()
    courseDurationMinutes: number;

    @XViewColumn()
    previsionedDurationDays: number;

    @XViewColumn()
    previsionedCompletionDate: Date;

    @XViewColumn()
    previsionedItemsPerDay: number;
}