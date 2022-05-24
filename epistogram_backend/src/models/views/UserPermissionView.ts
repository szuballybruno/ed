import { ViewColumn, ViewEntity } from 'typeorm';
import { PermissionCodeType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserPermissionView {

    @ViewColumn()
    assigneeUserId: number;

    @ViewColumn()
    contextCompanyId: number | null;

    @ViewColumn()
    contextCompanyName: string | null;

    @ViewColumn()
    contextCourseId: number | null;

    @ViewColumn()
    contextCourseName: string | null;

    @ViewColumn()
    permissionId: number;

    @ViewColumn()
    permissionCode: PermissionCodeType;

    @ViewColumn()
    assignmentBridgeId: number | null;

    @ViewColumn()
    parentRoleId: number | null;

    @ViewColumn()
    parentRoleName: string | null;
}