import { ViewColumn, ViewEntity } from '../MyORM';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { PermissionCodeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserPermissionView {

    @ViewColumn()
    @XViewColumn()
    assigneeUserId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    contextCompanyId: Id<'Company'> | null;

    @ViewColumn()
    @XViewColumn()
    contextCompanyName: string | null;

    @ViewColumn()
    @XViewColumn()
    contextCourseId: Id<'Course'> | null;

    @ViewColumn()
    @XViewColumn()
    contextCourseName: string | null;

    @ViewColumn()
    @XViewColumn()
    contextCommentId: Id<'Comment'> | null;

    @ViewColumn()
    @XViewColumn()
    permissionId: Id<'Permission'>;

    @ViewColumn()
    @XViewColumn()
    permissionCode: PermissionCodeType;

    @ViewColumn()
    @XViewColumn()
    assignmentBridgeId: Id<'PermissionAssignmentBridge'> | null;

    @ViewColumn()
    @XViewColumn()
    parentRoleId: Id<'Role'> | null;

    @ViewColumn()
    @XViewColumn()
    parentRoleName: string | null;
}