import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class CoinAcquirePerCourseView {

    @XViewColumn()
    id: Id<'CoinAcquirePerCourse'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    amount: number;
}