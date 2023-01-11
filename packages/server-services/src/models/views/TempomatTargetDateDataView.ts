import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

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