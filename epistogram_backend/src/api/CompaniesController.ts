import { CompanyService } from '../services/CompanyService';
import { ActionParams } from '../utilities/helpers';

export class CompaniesController {

    private _compService: CompanyService;

    constructor(compService: CompanyService) {

        this._compService = compService;
    }

    getCompaniesAction = (params: ActionParams) => {

        return this._compService
            .getCompaniesAsync(params.currentUserId);
    };

    getCompaniesAdminAction = (params: ActionParams) => {

        return this._compService
            .getCompaniesAdminAsync(params.currentUserId);
    };

    getCompanyEditDataAction = (params: ActionParams) => {

        return this._compService
            .getCompanyEditDataAsync(params
                .getQuery()
                .getValue(x => x.companyId, 'int'));
    };
}