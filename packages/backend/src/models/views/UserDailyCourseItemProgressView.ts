import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class UserDailyCourseItemProgressView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    completionDate: Date;

    @XViewColumn()
    completedItemCount: number;

    @XViewColumn()
    completedPercentage: number;

    @XViewColumn()
    isCurrent: number;

    @XViewColumn()
    offsetDaysFromStart: number;
}