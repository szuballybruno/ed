import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class UserCourseCompletionCurrentView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    requiredCompletionDate: Date;

    @XViewColumn()
    originalEstimatedLengthDays: number;

    @XViewColumn()
    requiredLengthDays: number;

    @XViewColumn()
    daysElapsedSinceStart: number;

    @XViewColumn()
    totalItemCount: number;

    @XViewColumn()
    previsionedCompletionDate: Date;

    @XViewColumn()
    remainingDays: number;

    @XViewColumn()
    previsionedItemsPerDay: number;

    @XViewColumn()
    previsionedItemsCompletedByNow: number;

    @XViewColumn()
    previsionedPercentCompletedByNow: number;

    @XViewColumn()
    requiredRemainingDays: number;

    @XViewColumn()
    requiredItemsPerDay: number;

    @XViewColumn()
    requiredItemsCompletedByNow: number;

    @XViewColumn()
    requiredPercentCompletedByNow: number;
}