import { Id } from '@episto/commontypes';
import { XViewColumn } from '@episto/x-orm';

export class TempomatTargetDateDataView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    totalItemCount: number;

    @XViewColumn()
    estimatedMinutesPerDay: number | null;

    @XViewColumn()
    courseDurationMinutes: number;
}
