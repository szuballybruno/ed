import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { PermissionCodeType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AssignableRoleView {

    @ViewColumn()
    @XViewColumn()
    assignerUserId: number;

    @ViewColumn()
    @XViewColumn()
    assigneeUserId: number;

    @ViewColumn()
    @XViewColumn()
    contextCompanyId: number;

    @ViewColumn()
    @XViewColumn()
    contextCompanyName: string;

    @ViewColumn()
    @XViewColumn()
    ownerCompanyId: number | null;

    @ViewColumn()
    @XViewColumn()
    ownerCompanyName: string | null;

    @ViewColumn()
    @XViewColumn()
    isCustom: boolean;

    @ViewColumn()
    @XViewColumn()
    roleId: number;

    @ViewColumn()
    @XViewColumn()
    roleName: string;

    @ViewColumn()
    @XViewColumn()
    isAssigned: boolean;

    @ViewColumn()
    @XViewColumn()
    canAssign: boolean;

    @ViewColumn()
    @XViewColumn()
    permissionId: number;

    @ViewColumn()
    @XViewColumn()
    permissionCode: PermissionCodeType;
}
