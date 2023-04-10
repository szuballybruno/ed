import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class UserInactiveCourseView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    inactiveCourseCount: number;
}