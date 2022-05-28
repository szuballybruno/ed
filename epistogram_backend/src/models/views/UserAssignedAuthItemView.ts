import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserAssignedAuthItemView {

    @ViewColumn()
    @XViewColumn()
    assigneeUserId: number;

    @ViewColumn()
    @XViewColumn()
    permissionId: number | null;

    @ViewColumn()
    @XViewColumn()
    roleId: number | null;

    @ViewColumn()
    @XViewColumn()
    contextCompanyId: number;

    @ViewColumn()
    @XViewColumn()
    isRole: boolean;
}