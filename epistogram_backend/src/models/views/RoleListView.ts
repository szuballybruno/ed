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
    ownerCompanyId: number;

    @ViewColumn()
    @XViewColumn()
    ownerName: string;

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
    permissionId: number;

    @ViewColumn()
    @XViewColumn()
    permissionCode: PermissionCodeType;
}