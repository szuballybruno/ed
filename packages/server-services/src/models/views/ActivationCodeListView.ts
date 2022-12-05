import { Id } from '@episto/commontypes';
import { XViewColumn } from '@episto/x-orm';

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