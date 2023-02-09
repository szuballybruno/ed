import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CourseCompanyBridgeView {

    @XViewColumn()
    id: Id<'CourseCompanyBridge'>;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    courseId: Id<'Course'>;
}