import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';



export class UserInactiveCourseView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    inactiveCourseCount: number;
}