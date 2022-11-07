import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { PermissionCodeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';


export class UserPermissionView {

    @XViewColumn()
    assigneeUserId: Id<'User'>;

    @XViewColumn()
    contextCompanyId: Id<'Company'> | null;

    @XViewColumn()
    contextCompanyName: string | null;

    @XViewColumn()
    contextCourseId: Id<'Course'> | null;

    @XViewColumn()
    contextCourseName: string | null;

    @XViewColumn()
    contextCommentId: Id<'Comment'> | null;

    @XViewColumn()
    permissionId: Id<'Permission'>;

    @XViewColumn()
    permissionCode: PermissionCodeType;

    @XViewColumn()
    assignmentBridgeId: Id<'PermissionAssignmentBridge'> | null;

    @XViewColumn()
    parentRoleId: Id<'Role'> | null;

    @XViewColumn()
    parentRoleName: string | null;
}