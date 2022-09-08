import { CompanyService } from '../services/CompanyService';
import { CompanyEditDataDTO } from '../shared/dtos/company/CompanyEditDataDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class CompanyController implements XController<CompanyController> {

    private _compService: CompanyService;

    constructor(serviceProvider: ServiceProvider) {

        this._compService = serviceProvider.getService(CompanyService);
    }

    @XControllerAction(apiRoutes.companies.getCompanies)
    getCompaniesAction(params: ActionParams) {

        return this._compService
            .getPrincipalCompaniesAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.companies.getCompaniesAdmin)
    getCompaniesAdminAction(params: ActionParams) {

        return this._compService
            .getCompaniesAdminAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.companies.getRoleAssignCompanies)
    getRoleAssignCompaniesAction(params: ActionParams) {

        return this._compService
            .getRoleAssignCompaniesAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.companies.getCompanyEditData)
    getCompanyEditDataAction(params: ActionParams) {

        const companyId = Id
            .create<'Company'>(params
                .getQuery()
                .getValue(x => x.companyId, 'int'));

        return this._compService
            .getCompanyEditDataAsync(params.principalId, companyId);
    }

    @XControllerAction(apiRoutes.companies.getAvailableCompaniesForRoleCreation)
    getAvailableCompaniesForRoleCreationAction(params: ActionParams) {

        return this._compService
            .getAvailableCompaniesForNewRolesAsync(params.principalId,);
    }

    @XControllerAction(apiRoutes.companies.createCompany, { isPost: true })
    createCompanyAction(params: ActionParams) {

        return this._compService
            .createCompanyAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.companies.deleteCompany, { isPost: true })
    deleteCompanyAction(params: ActionParams) {

        const companyId = Id
            .create<'Company'>(params
                .getBody()
                .getValue(x => x.companyId, 'int'));

        return this._compService
            .deleteCompanyAsync(params.principalId, companyId);
    }

    @XControllerAction(apiRoutes.companies.saveCompany, { isPost: true })
    saveCompanyAction(params: ActionParams) {

        const dto = params
            .getBody<CompanyEditDataDTO>()
            .data;

        const logoFile = params
            .files
            .getValueOrNull(x => x.logoFile, 'any');

        const coverFile = params
            .files
            .getValueOrNull(x => x.coverFile, 'any');

        return this._compService
            .saveCompanyAsync(params.principalId, dto, logoFile, coverFile);
    }

    @XControllerAction(apiRoutes.companies.getCompanyDetailsByDomain, { isPublic: true })
    getCompanyDetailsByDomainAction(params: ActionParams) {

        const data = params
            .getFromParameterized(apiRoutes.companies.getCompanyDetailsByDomain);

        return this._compService
            .getCompanyDetailsByDomainAsync(data.query.getValue(x => x.domain, 'string'));
    }
}