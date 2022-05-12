import { CompanyService } from '../services/CompanyService';
import { PermissionService } from '../services/PermissionService';
import { CompanyEditDataDTO } from '../shared/dtos/company/CompanyEditDataDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ActionParams } from "../utilities/ActionParams";
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class CompanyController {

    private _compService: CompanyService;
    private _permissionService: PermissionService;

    constructor(compService: CompanyService, permissionService: PermissionService) {

        this._compService = compService;
        this._permissionService = permissionService;
    }

    @XControllerAction(apiRoutes.companies.getCompanies)
    getCompaniesAction = async (params: ActionParams) => {

        return await this._compService
            .getCompaniesAsync(params.currentUserId);
    };

    @XControllerAction(apiRoutes.companies.getCompaniesAdmin)
    getCompaniesAdminAction = async (params: ActionParams) => {

        return await this._compService
            .getCompaniesAdminAsync(params.currentUserId);
    };

    @XControllerAction(apiRoutes.companies.getRoleManageCompanies)
    getRoleManageCompaniesAction = async (params: ActionParams) => {

        return await this._compService
            .getRoleManageCompaniesAsync(params.currentUserId);
    };

    @XControllerAction(apiRoutes.companies.getCompanyEditData)
    getCompanyEditDataAction = async (params: ActionParams) => {

        const companyId = params
            .getQuery()
            .getValue(x => x.companyId, 'int');

        await this._permissionService
            .checkPermissionAsync(params.currentUserId, companyId, 'MANAGE_COMPANY');

        return await this._compService
            .getCompanyEditDataAsync(companyId);
    };

    @XControllerAction(apiRoutes.companies.getAvailableCompaniesForRoleCreation)
    getAvailableCompaniesForRoleCreationAction = async (params: ActionParams) => {

        return this._compService
            .getAvailableCompaniesForNewRolesAsync(params.currentUserId);
    };

    @XControllerAction(apiRoutes.companies.createCompany, { isPost: true })
    createCompanyAction = async (params: ActionParams) => {

        await this._permissionService
            .checkPermissionAsync(params.currentUserId, 'CREATE_COMPANY');

        await this._compService
            .createCompanyAsync();
    };

    @XControllerAction(apiRoutes.companies.deleteCompany, { isPost: true })
    deleteCompanyAction = async (params: ActionParams) => {

        await this._permissionService
            .checkPermissionAsync(params.currentUserId, 'DELETE_COMPANY');

        await this._compService
            .deleteCompanyAsync(params
                .getBody()
                .getValue(x => x.companyId, 'int'));
    };

    @XControllerAction(apiRoutes.companies.saveCompany, { isPost: true })
    saveCompanyAction = async (params: ActionParams) => {

        await this._compService
            .saveCompanyAsync(params
                .getBody<CompanyEditDataDTO>().data);
    };
}