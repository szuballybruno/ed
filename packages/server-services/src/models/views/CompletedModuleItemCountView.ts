import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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