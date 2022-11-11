import generatePassword from 'password-generator';
import { ActivationCode } from '../models/entity/misc/ActivationCode';
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

    async generateActivationCodesAsync(amount: number, companyId: Id<'Company'>) {

        const codes = forN(amount, x => this.genCode());

        await this._ormService
            .createManyAsync(ActivationCode, codes
                .map(x => instantiate<InsertEntity<ActivationCode>>({
                    code: x,
                    companyId: companyId,
                    trialLengthDays: 30,
                    userId: null
                })));
    }

    private genCode = () => {

        return 'MELO' + generatePassword(8)
            .toUpperCase();
    };
}