import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';


export class UserAssignedAuthItemView {

    @XViewColumn()
    assigneeUserId: Id<'User'>;

    @XViewColumn()
    permissionId: Id<'Permission'> | null;

    @XViewColumn()
    roleId: Id<'Role'> | null;

    @XViewColumn()
    contextCompanyId: Id<'Company'>;

    @XViewColumn()
    isRole: boolean;
}