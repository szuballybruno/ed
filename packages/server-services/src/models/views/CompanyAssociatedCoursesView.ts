import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CompanyAssociatedCoursesView {

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    isDeleted: boolean;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    isAssigned: boolean;

    @XViewColumn()
    isDefault: boolean;

    @XViewColumn()
    coverFilePath: string;

    @XViewColumn()
    title: string;
}