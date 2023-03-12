import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CompanyOwnerBridge {

    @XViewColumn()
    id: Id<'CompanyOwnerBridge'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    companyId: Id<'Company'>;
}