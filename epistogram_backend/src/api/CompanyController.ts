import { CompanyService } from '../services/CompanyService';
import { CompanyEditDataDTO } from '../shared/dtos/company/CompanyEditDataDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class CompanyController {

    private _compService: CompanyService;

    constructor(compService: CompanyService) {

        this._compService = compService;
    }

    @XControllerAction(apiRoutes.companies.getCompanies)
    getCompaniesAction = async (params: ActionParams) => {

        return await this._compService
            .getPrincipalCompaniesAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.companies.getCompaniesAdmin)
    getCompaniesAdminAction = async (params: ActionParams) => {

        return await this._compService
            .getCompaniesAdminAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.companies.getRoleManageCompanies)
    getRoleManageCompaniesAction = async (params: ActionParams) => {

        return await this._compService
            .getRoleManageCompaniesAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.companies.getCompanyEditData)
    getCompanyEditDataAction = async (params: ActionParams) => {

        return await this._compService
            .getCompanyEditDataAsync(params.principalId, params
                .getQuery()
                .getValue(x => x.companyId, 'int'));
    };

    @XControllerAction(apiRoutes.companies.getAvailableCompaniesForRoleCreation)
    getAvailableCompaniesForRoleCreationAction = async (params: ActionParams) => {

        return this._compService
            .getAvailableCompaniesForNewRolesAsync(params.principalId,);
    };

    @XControllerAction(apiRoutes.companies.createCompany, { isPost: true })
    createCompanyAction = async (params: ActionParams) => {

        await this._compService
            .createCompanyAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.companies.deleteCompany, { isPost: true })
    deleteCompanyAction = async (params: ActionParams) => {

        await this._compService
            .deleteCompanyAsync(params.principalId, params
                .getBody()
                .getValue(x => x.companyId, 'int'));
    };

    @XControllerAction(apiRoutes.companies.saveCompany, { isPost: true })
    saveCompanyAction = async (params: ActionParams) => {

        await this._compService
            .saveCompanyAsync(params.principalId, params
                .getBody<CompanyEditDataDTO>().data);
    };
}