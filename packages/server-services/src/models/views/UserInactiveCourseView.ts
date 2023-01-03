import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class UserInactiveCourseView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    inactiveCourseCount: number;
}