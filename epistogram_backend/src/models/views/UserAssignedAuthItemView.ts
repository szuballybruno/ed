import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Permission } from '../entity/authorization/Permission';
import { Role } from '../entity/authorization/Role';
import { Company } from '../entity/Company';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserAssignedAuthItemView {

    @ViewColumn()
    @XViewColumn()
    assigneeUserId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    permissionId: Id<'Permission'> | null;

    @ViewColumn()
    @XViewColumn()
    roleId: Id<'Role'> | null;

    @ViewColumn()
    @XViewColumn()
    contextCompanyId: Id<'Company'>;

    @ViewColumn()
    @XViewColumn()
    isRole: boolean;
}