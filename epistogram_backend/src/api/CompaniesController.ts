import { CompanyService } from '../services/CompanyService';
import { PermissionService } from '../services/PermissionService';
import { CompanyEditDataDTO } from '../shared/dtos/company/CompanyEditDataDTO';
import { ActionParams } from '../utilities/helpers';

export class CompaniesController {

    private _compService: CompanyService;
    private _permissionService: PermissionService;

    constructor(compService: CompanyService, permissionService: PermissionService) {

        this._compService = compService;
        this._permissionService = permissionService;
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

        const companyId = params
            .getQuery()
            .getValue(x => x.companyId, 'int');

        await this._permissionService
            .checkPermissionAsync(params.currentUserId, companyId, 'MANAGE_COMPANY');

        return await this._compService
            .getCompanyEditDataAsync(companyId);
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