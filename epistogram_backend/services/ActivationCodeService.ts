import generatePassword from "password-generator";
import { ActivationCode } from "../models/entity/ActivationCode";
import { forN } from "../utilities/helpers";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class ActivationCodeService {

    private _ormService: ORMConnectionService;

    constructor(ormService: ORMConnectionService) {

        this._ormService = ormService;
    }

    async isValidCode(code: string) {

        const actCode = await this._ormService
            .getRepository(ActivationCode)
            .findOne({
                where: {
                    isUsed: false,
                    code
                }
            });

        return !!actCode;
    }

    async generateActivationCodesAsync(amount: number) {

        const codes = forN(amount, x => this.genCode());

        await this._ormService
            .getRepository(ActivationCode)
            .insert(codes
                .map(x => ({
                    code: x,
                    isUsed: false
                })));
    }

    private genCode = () => {

        return "PCW-" + generatePassword(8).toUpperCase();
    }
}