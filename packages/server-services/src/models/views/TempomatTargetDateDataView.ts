import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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