import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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