import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { PermissionCodeType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserRoleView {

    @ViewColumn()
    @XViewColumn()
    assignmentBridgeId: number;

    @ViewColumn()
    @XViewColumn()
    contextCompanyId: number;

    @ViewColumn()
    @XViewColumn()
    contextCompanyName: string;

    @ViewColumn()
    @XViewColumn()
    roleId: number;

    @ViewColumn()
    @XViewColumn()
    roleName: string;

    @ViewColumn()
    @XViewColumn()
    assigneeUserId: number;

    @ViewColumn()
    @XViewColumn()
    isInherited: boolean;

    @ViewColumn()
    @XViewColumn()
    permissionId: number;

    @ViewColumn()
    @XViewColumn()
    permissionCode: PermissionCodeType;
}