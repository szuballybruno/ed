import generatePassword from 'password-generator';
import { ActivationCode } from '../models/entity/ActivationCode';
import { forN } from '../utilities/helpers';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class ActivationCodeService {

    private _ormService: ORMConnectionService;

    constructor(ormService: ORMConnectionService) {

        this._ormService = ormService;
    }

    async isValidCodeAsync(code: string) {

        const actCode = await this._ormService
            .query(ActivationCode, {
                code
            })
            .where('code', '=', 'code')
            .and('isUsed', 'IS', 'false')
            .getSingle()

        return actCode;
    }

    async invalidateCodeAsync(codeId: number) {

        await this._ormService
            .save(ActivationCode, {
                id: codeId,
                isUsed: true
            });
    }

    async generateActivationCodesAsync(amount: number) {

        const codes = forN(amount, x => this.genCode());

        await this._ormService
            .createManyAsync(ActivationCode, codes
                .map(x => ({
                    code: x,
                    isUsed: false
                } as ActivationCode)));
    }

    private genCode = () => {

        return 'PCW-' + generatePassword(8)
            .toUpperCase();
    };
}