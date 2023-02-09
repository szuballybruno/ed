import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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