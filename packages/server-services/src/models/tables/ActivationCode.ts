import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class ActivationCode {

    @XViewColumn()
    id: Id<'ActivationCode'>;

    @XViewColumn()
    code: string;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    userId: Id<'User'> | null;

    @XViewColumn()
    trialLengthDays: number;
}