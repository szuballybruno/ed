import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class CompletedModuleItemCountView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    completedCourseItemCount: number;
}