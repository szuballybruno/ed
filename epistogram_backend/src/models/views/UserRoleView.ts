import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { PermissionCodeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';
import { Permission } from '../entity/authorization/Permission';
import { Role } from '../entity/authorization/Role';
import { RoleAssignmentBridge } from '../entity/authorization/RoleAssignmentBridge';
import { Company } from '../entity/Company';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserRoleView {

    @ViewColumn()
    @XViewColumn()
    assignmentBridgeId: Id<RoleAssignmentBridge>;

    @ViewColumn()
    @XViewColumn()
    contextCompanyId: Id<Company>;

    @ViewColumn()
    @XViewColumn()
    contextCompanyName: string;

    @ViewColumn()
    @XViewColumn()
    roleId: Id<Role>;

    @ViewColumn()
    @XViewColumn()
    roleName: string;

    @ViewColumn()
    @XViewColumn()
    assigneeUserId: Id<User>;

    @ViewColumn()
    @XViewColumn()
    isInherited: boolean;

    @ViewColumn()
    @XViewColumn()
    permissionId: Id<Permission>;

    @ViewColumn()
    @XViewColumn()
    permissionCode: PermissionCodeType;
}