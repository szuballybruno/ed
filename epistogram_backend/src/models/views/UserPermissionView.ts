import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { PermissionCodeType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserPermissionView {

    @ViewColumn()
    @XViewColumn()
    assigneeUserId: number;

    @ViewColumn()
    @XViewColumn()
    contextCompanyId: number | null;

    @ViewColumn()
    @XViewColumn()
    contextCompanyName: string | null;

    @ViewColumn()
    @XViewColumn()
    contextCourseId: number | null;

    @ViewColumn()
    @XViewColumn()
    contextCourseName: string | null;

    @ViewColumn()
    @XViewColumn()
    contextCommentId: number | null;

    @ViewColumn()
    @XViewColumn()
    permissionId: number;

    @ViewColumn()
    @XViewColumn()
    permissionCode: PermissionCodeType;

    @ViewColumn()
    @XViewColumn()
    assignmentBridgeId: number | null;

    @ViewColumn()
    @XViewColumn()
    parentRoleId: number | null;

    @ViewColumn()
    @XViewColumn()
    parentRoleName: string | null;
}