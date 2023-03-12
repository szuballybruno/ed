import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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