import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { PermissionCodeType, PermissionScopeType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AssignablePermissionView {

    @ViewColumn()
    @XViewColumn()
    assigneeUserId: number;

    @ViewColumn()
    @XViewColumn()
    contextCompanyId: number;

    @ViewColumn()
    @XViewColumn()
    permissionId: number;

    @ViewColumn()
    @XViewColumn()
    permissionCode: PermissionCodeType;

    @ViewColumn()
    @XViewColumn()
    permissionScope: PermissionScopeType;
}
