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
    contextCompanyId: number;

    @ViewColumn()
    contextCourseId: number;

    @ViewColumn()
    permissionCode: PermissionCodeType;
}