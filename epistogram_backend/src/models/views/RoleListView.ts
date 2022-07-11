import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { IsDeletedFlag } from '../../services/XORM/XORMDecorators';
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
export class RoleListView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    ownerCompanyId: Id<'Company'>;

    @ViewColumn()
    @XViewColumn()
    ownerName: string;

    @ViewColumn()
    @XViewColumn()
    @IsDeletedFlag('bool')
    isDeleted: boolean;

    @ViewColumn()
    @XViewColumn()
    roleId: Id<'Role'>;

    @ViewColumn()
    @XViewColumn()
    roleName: string;

    @ViewColumn()
    @XViewColumn()
    permissionId: Id<'Permission'>;

    @ViewColumn()
    @XViewColumn()
    permissionCode: PermissionCodeType;
}