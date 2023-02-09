import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class Role {

    @XViewColumn()
    id: Id<'Role'>;

    @XViewColumn()
    deletionDate: Date | null;

    @XViewColumn()
    name: string;

    @XViewColumn()
    isCustom: boolean;

    @XViewColumn()
    companyId: Id<'Company'> | null;
}