import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class TempomatTargetDateDataView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    totalItemCount: number;

    @XViewColumn()
    estimatedMinutesPerDay: number;

    @XViewColumn()
    courseDurationMinutes: number;
}