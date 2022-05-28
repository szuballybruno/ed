import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { IsDeletedFlag } from '../../services/XORM/XORMDecorators';
import { PermissionCodeType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class RoleListView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    companyId: number;

    @ViewColumn()
    @XViewColumn()
    companyName: string;

    @ViewColumn()
    @XViewColumn()
    @IsDeletedFlag('bool')
    isDeleted: boolean;

    @ViewColumn()
    @XViewColumn()
    roleId: number;

    @ViewColumn()
    @XViewColumn()
    roleName: string;

    @ViewColumn()
    @XViewColumn()
    isCompanyOwned: boolean;

    @ViewColumn()
    @XViewColumn()
    ownerName: string;

    @ViewColumn()
    @XViewColumn()
    permissionId: number;

    @ViewColumn()
    @XViewColumn()
    permissionCode: PermissionCodeType;
}