import { ViewColumn, ViewEntity } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';
import { PermissionCodeType, RoleScopeType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class RoleListView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    companyId: number;

    @ViewColumn()
    companyName: string;

    @ViewColumn()
    @IsDeletedFlag('bool')
    isDeleted: boolean;

    @ViewColumn()
    roleId: number;

    @ViewColumn()
    roleScope: RoleScopeType;

    @ViewColumn()
    roleName: string;

    @ViewColumn()
    isCompanyOwned: boolean;

    @ViewColumn()
    ownerName: string;

    @ViewColumn()
    permissionId: number;

    @ViewColumn()
    permissionCode: PermissionCodeType;
}