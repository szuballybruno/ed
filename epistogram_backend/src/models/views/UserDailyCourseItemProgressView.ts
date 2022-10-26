import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


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