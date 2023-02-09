import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class ActivationCodeListView {

    @XViewColumn()
    activationCodeId: Id<'ActivationCode'>;

    @XViewColumn()
    code: string;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    companyName: string;

    @XViewColumn()
    trialLengthDays: number;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    email: string;

    @XViewColumn()
    isUsed: boolean;

    @XViewColumn()
    daysElapsedFromTrial: number;

    @XViewColumn()
    isTrialOver: boolean;
}