import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseCategoryAssignmentBridge {

    @XViewColumn()
    id: Id<'CourseCategoryAssignmentBridge'>;

    @XViewColumn()
    courseCategoryId: Id<'CourseCategory'>;

    @XViewColumn()
    companyId: Id<'Company'>;
}