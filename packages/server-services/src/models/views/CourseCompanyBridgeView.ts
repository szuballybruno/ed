import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class CourseCompanyBridgeView {

    @XViewColumn()
    id: Id<'CourseCompanyBridge'>;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    courseId: Id<'Course'>;
}