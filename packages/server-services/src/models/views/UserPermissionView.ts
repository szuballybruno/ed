import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserPermissionView {

    @XViewColumn()
    assigneeUserId: Id<'AssigneeUser'>;

    @XViewColumn()
    contextCompanyId: Id<'ContextCompany'>;

    @XViewColumn()
    contextCompanyName: string;

    @XViewColumn()
    contextCourseId: Id<'ContextCourse'>;

    @XViewColumn()
    contextCourseName: string;

    @XViewColumn()
    contextCommentId: Id<'ContextComment'>;

    @XViewColumn()
    permissionId: Id<'Permission'>;

    @XViewColumn()
    permissionCode: string;

    @XViewColumn()
    permissionScope: string;

    @XViewColumn()
    parentRoleId: Id<'ParentRole'>;

    @XViewColumn()
    parentRoleName: string;

    @XViewColumn()
    assignmentBridgeId: Id<'AssignmentBridge'>;
}