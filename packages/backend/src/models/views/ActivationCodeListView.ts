import { Id } from '@episto/commontypes';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

export class ActivationCodeListView {

    @XViewColumn()
    activationCodeId: Id<'ActivationCode'>;

    @XViewColumn()
    code: string;

    @XViewColumn()
    companyId: Id<'Company'>;

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