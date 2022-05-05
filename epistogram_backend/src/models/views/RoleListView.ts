import { ViewColumn, ViewEntity } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';
import { PermissionCodeType } from '../../shared/types/sharedTypes';

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