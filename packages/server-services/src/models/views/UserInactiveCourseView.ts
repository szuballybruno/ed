import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserInactiveCourseView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    inactiveCourseCount: number;
}