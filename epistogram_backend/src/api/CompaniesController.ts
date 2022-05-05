import { CompanyService } from '../services/CompanyService';
import { CompanyEditDataDTO } from '../shared/dtos/company/CompanyEditDataDTO';
import { ActionParams } from '../utilities/helpers';

export class CompaniesController {

    private _compService: CompanyService;

    constructor(compService: CompanyService) {

        this._compService = compService;
    }

    getCompaniesAction = async (params: ActionParams) => {

        return await this._compService
            .getCompaniesAsync(params.currentUserId);
    };

    getCompaniesAdminAction = async (params: ActionParams) => {

        return await this._compService
            .getCompaniesAdminAsync(params.currentUserId);
    };

    getCompanyEditDataAction = async (params: ActionParams) => {

        return await this._compService
            .getCompanyEditDataAsync(params
                .getQuery()
                .getValue(x => x.companyId, 'int'));
    };

    createCompanyAction = async (params: ActionParams) => {

        await this._compService
            .createCompanyAsync();
    };

    deleteCompanyAction = async (params: ActionParams) => {
        
        await this._compService
            .deleteCompanyAsync(params
                .getBody()
                .getValue(x => x.companyId, 'int'));
    };

    saveCompanyAction = async (params: ActionParams) => {

        await this._compService
            .saveCompanyAsync(params
                .getBody<CompanyEditDataDTO>().data);
    };
}