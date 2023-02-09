import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CompanyOwnerBridge {

    @XViewColumn()
    id: Id<'CompanyOwnerBridge'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    companyId: Id<'Company'>;
}