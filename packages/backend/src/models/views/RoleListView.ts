import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { DeletionDateColumn } from '../../services/XORM/XORMDecorators';
import { PermissionCodeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';


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