import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class UserFeatureView {

    @XViewColumn()
    assignmentBridgeId: Id<'AssignmentBridge'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    featureId: Id<'Feature'>;

    @XViewColumn()
    featureCode: string;
}