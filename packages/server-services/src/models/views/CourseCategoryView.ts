import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseCategoryView {

    @XViewColumn()
    id: Id<'CourseCategory'>;

    @XViewColumn()
    name: string;

    @XViewColumn()
    parentCategoryId: Id<'ParentCategory'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    companyId: Id<'Company'>;
}