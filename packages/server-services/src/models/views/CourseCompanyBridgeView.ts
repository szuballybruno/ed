import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseCompanyBridgeView {

    @XViewColumn()
    id: Id<'CourseCompanyBridge'>;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    courseId: Id<'Course'>;
}