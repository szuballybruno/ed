import { Id } from "@episto/commontypes";

export class ActivationCodeListDTO {
    activationCodeId: Id<'ActivationCode'>;
    code: string;
    companyId: Id<'Company'>;
    trialLengthDays: number;
    userId: Id<'User'>;
    email: string;
    isUsed: boolean;
    daysElapsedFromTrial: number;
    isTrialOver: boolean;
    url: string;
};