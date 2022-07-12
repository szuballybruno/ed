import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { PermissionCodeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';
import { Permission } from '../entity/authorization/Permission';
import { Role } from '../entity/authorization/Role';
import { Company } from '../entity/Company';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AssignableRoleView {

    @ViewColumn()
    @XViewColumn()
    assignerUserId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    assigneeUserId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    contextCompanyId: Id<'Company'>;

    @ViewColumn()
    @XViewColumn()
    contextCompanyName: string;

    @ViewColumn()
    @XViewColumn()
    ownerCompanyId: Id<'Company'> | null;

    @ViewColumn()
    @XViewColumn()
    ownerCompanyName: string | null;

    @ViewColumn()
    @XViewColumn()
    isCustom: boolean;

    @ViewColumn()
    @XViewColumn()
    roleId: Id<'Role'>;

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
    permissionId: Id<'Permission'>;

    @ViewColumn()
    @XViewColumn()
    permissionCode: PermissionCodeType;
}
