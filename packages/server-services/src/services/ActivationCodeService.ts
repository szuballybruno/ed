import generatePassword from 'password-generator';
import { ActivationCode } from '../models/tables/ActivationCode';
import { Id } from '@episto/commontypes';
import { forN } from '../utilities/helpers';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { ActivationCodeListView } from '../models/views/ActivationCodeListView';
import { instantiate } from '@episto/commonlogic';
import { InsertEntity } from '../utilities/misc';

export class ActivationCodeService {

    private _ormService: ORMConnectionService;

    constructor(ormService: ORMConnectionService) {

        this._ormService = ormService;
    }

    async isValidCodeAsync(code: string) {

        const actCode = await this._ormService
            .query(ActivationCodeListView, { code })
            .where('code', '=', 'code')
            .and('isUsed', 'IS', 'false')
            .getOneOrNull();

        return actCode;
    }

    async invalidateCodeAsync(codeId: Id<'ActivationCode'>, userId: Id<'User'>) {

        await this._ormService
            .save(ActivationCode, {
                id: codeId,
                userId
            });
    }

    async generateActivationCodesAsync(prefix: string, amount: number, companyId: Id<'Company'>) {

        const activationCodes = await this
            .previewActivationCodesAsync(prefix, amount);

        await this._ormService
            .createManyAsync(ActivationCode, activationCodes
                .map(activationCode => instantiate<InsertEntity<ActivationCode>>({
                    code: activationCode,
                    companyId: companyId,
                    trialLengthDays: 30,
                    userId: null
                })));
    }

    async previewActivationCodesAsync(prefix: string, amount: number) {

        const prefixUpper = prefix.toUpperCase();
        const activationCodes = forN(amount, () => this
            ._generateActivationCode(prefixUpper));
        return activationCodes;
    }

    private _generateActivationCode = (prefix: string) => {

        return `${prefix}-${generatePassword(8).toUpperCase()}`;
    };
}