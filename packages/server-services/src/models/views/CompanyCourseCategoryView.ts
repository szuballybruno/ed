import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CompanyCourseCategoryView {

    @XViewColumn()
    name: string;

    @XViewColumn()
    courseCategoryId: Id<'CourseCategory'>;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    isEnabled: boolean;
}