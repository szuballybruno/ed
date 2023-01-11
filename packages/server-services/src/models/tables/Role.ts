import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

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