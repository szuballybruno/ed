import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class UserDailyProgressView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    spentSeconds: number;
}