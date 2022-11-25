import { CompanyService } from '@episto/server-services';
import { CompanyEditDataDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { ServiceProvider } from '../startup/ServiceProvider';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { XController } from '../XTurboExpress/XTurboExpressTypes';

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

    @XControllerAction(apiRoutes.companies.getUserInvitationCompanyData)
    getUserInvitationCompanyDataAction(params: ActionParams) {

        return this
            ._compService
            .getUserInvitationCompanyDataAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.companies.getCompanyDetailsByDomain, { isPublic: true })
    getCompanyDetailsByDomainAction(params: ActionParams) {

        const data = params
            .getFromParameterized(apiRoutes.companies.getCompanyDetailsByDomain);

        return this._compService
            .getCompanyDetailsByDomainAsync(data.query.getValue(x => x.domain, 'string'));
    }

    @XControllerAction(apiRoutes.companies.getCompanyCourseAssociations)
    getCompanyCourseAssociationsAction(params: ActionParams) {

        const data = params
            .getFromParameterized(apiRoutes.companies.getCompanyCourseAssociations);

        return this._compService
            .getCompanyAssociatedCoursesAsync(data.query.getValue(x => x.companyId, 'int'));
    }

    @XControllerAction(apiRoutes.companies.saveCompanyCourseAssociations, { isPost: true })
    saveCompanyCourseAssociationsAction(params: ActionParams) {

        const data = params
            .getFromParameterized(apiRoutes.companies.saveCompanyCourseAssociations);

        const body = data.body;

        return this._compService
            .saveCompanyAssociatedCoursesAsync(body.getValue(x => x.companyId, 'int'), body.getValue(x => x.mutations));
    }

    @XControllerAction(apiRoutes.companies.createCompanyActivationCodes, { isPost: true })
    createCompanyActivationCodesAction(params: ActionParams) {

        const data = params
            .getFromParameterized(apiRoutes.companies.createCompanyActivationCodes);

        const body = data.body;

        const activationCodeCount = body.getValue(x => x.activationCodeCount, 'int');
        const companyId = body.getValue(x => x.companyId, 'int');

        return this._compService
            .createCompanyActivationCodesAsync(activationCodeCount, companyId);
    }

}