import { ViewColumn, ViewEntity } from 'typeorm';
import { PermissionCodeType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserPermissionView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    contextCompanyId: number;

    @ViewColumn()
    permissionCode: PermissionCodeType;
}