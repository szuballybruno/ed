import { XViewColumn } from '@episto/x-orm';
import { DeletionDateColumn } from '@episto/x-orm';
import { PermissionCodeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';


export class RoleListView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    ownerCompanyId: Id<'Company'>;

    @XViewColumn()
    ownerName: string;

    @XViewColumn()
    @DeletionDateColumn('bool')
    isDeleted: boolean;

    @XViewColumn()
    roleId: Id<'Role'>;

    @XViewColumn()
    roleName: string;

    @XViewColumn()
    permissionId: Id<'Permission'>;

    @XViewColumn()
    permissionCode: PermissionCodeType;
}