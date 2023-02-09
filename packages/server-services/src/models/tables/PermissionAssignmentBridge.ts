import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class PermissionAssignmentBridge {

    @XViewColumn()
    id: Id<'PermissionAssignmentBridge'>;

    @XViewColumn()
    permissionId: Id<'Permission'>;

    @XViewColumn()
    assigneeUserId: Id<'User'> | null;

    @XViewColumn()
    assigneeCompanyId: Id<'Company'> | null;

    @XViewColumn()
    assigneeGroupId: Id<'Group'> | null;

    @XViewColumn()
    contextCompanyId: Id<'Company'> | null;

    @XViewColumn()
    contextCourseId: Id<'Course'> | null;
}