import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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