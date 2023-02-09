import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserPrequizAnswersView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    experience: number;

    @XViewColumn()
    plannedUsageAnswerId: Id<'PlannedUsageAnswer'>;

    @XViewColumn()
    estimatedMinutesPerDay: number;
}