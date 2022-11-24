import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class UserDailyProgressView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    spentSeconds: number;

    @XViewColumn()
    creationDate: Date;
}