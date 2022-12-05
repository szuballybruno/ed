import { Id } from '@episto/commontypes';
import { XViewColumn } from '@episto/x-orm';

export class ActivationCode {

    @XViewColumn()
    id: Id<'ActivationCode'>;

    @XViewColumn()
    code: string;

    @XViewColumn()
    userId: Id<'User'> | null;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    trialLengthDays: number;
}