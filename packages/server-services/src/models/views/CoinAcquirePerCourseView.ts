import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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