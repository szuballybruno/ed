import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class UserRoleAssignCompanyView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    companyName: string;

    @XViewColumn()
    canAssign: boolean;
}