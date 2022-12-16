import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class UserWeeklyCourseItemProgressView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    completionDate: Date;

    @XViewColumn()
    isCurrent: boolean;

    @XViewColumn()
    completedItemCount: number;
}