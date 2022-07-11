import { Company } from '../models/entity/Company';
import { CompanyService } from '../services/CompanyService';
import { CompanyEditDataDTO } from '../shared/dtos/company/CompanyEditDataDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class CompanyController {

    private _compService: CompanyService;

    constructor(serviceProvider: ServiceProvider) {

        this._compService = serviceProvider.getService(CompanyService);
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

    @XControllerAction(apiRoutes.companies.getRoleAssignCompanies)
    getRoleAssignCompaniesAction = async (params: ActionParams) => {

        return await this._compService
            .getRoleAssignCompaniesAsync(params.principalId);
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

        const companyId = Id
            .create<Company>(params
                .getBody()
                .getValue(x => x.companyId, 'int'))

        await this._compService
            .deleteCompanyAsync(params.principalId, companyId);
    };

    @XControllerAction(apiRoutes.companies.saveCompany, { isPost: true })
    saveCompanyAction = async (params: ActionParams) => {

        await this._compService
            .saveCompanyAsync(params.principalId, params
                .getBody<CompanyEditDataDTO>().data);
    };
}