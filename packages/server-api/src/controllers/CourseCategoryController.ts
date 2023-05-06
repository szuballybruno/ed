import { apiRoutes } from '@episto/communication';
import { CourseCategoryService, UserCourseBridgeService } from '@episto/server-services';
import { IXGatewayServiceProvider, XControllerAction } from '@episto/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { IController } from '../interfaces/IController';

export class CourseCategoryController implements IController<CourseCategoryController> {

    private _courseCategoryService: CourseCategoryService;
    private _userCourseBridgeService: UserCourseBridgeService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._courseCategoryService = serviceProvider.getService(CourseCategoryService);
        this._userCourseBridgeService = serviceProvider.getService(UserCourseBridgeService);
    }

    @XControllerAction(apiRoutes.courseCategory.getAvailableCourseCategories)
    getAvailableCourseCategoriesAction = (params: ActionParams) => {

        return this
            ._courseCategoryService
            .getAvailableCourseCategoriesAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.courseCategory.createCourseCategory, { isPost: true })
    createCourseCategoryAction = (params: ActionParams) => {

        const dto = params
            .getFromParameterized(apiRoutes.courseCategory.createCourseCategory)
            .body
            .data;

        return this
            ._courseCategoryService
            .createCourseCategoryAsync(params.principalId, dto);
    };

    @XControllerAction(apiRoutes.courseCategory.deleteCourseCategory, { isPost: true })
    deleteCourseCategoryAction = (params: ActionParams) => {

        const body = params
            .getFromParameterized(apiRoutes.courseCategory.deleteCourseCategory)
            .body

        const courseCategoryId = body
            .getValue(x => x.courseCategoryId, 'int')

        const companyId = body
            .getValue(x => x.companyId, 'int')

        return this
            ._courseCategoryService
            .deleteCourseCategoryAsync(params.principalId, courseCategoryId, companyId);
    };



    @XControllerAction(apiRoutes.courseCategory.getCompanyCourseCategories)
    getCompanyCourseCategoriesAction(params: ActionParams) {

        const companyId = params
            .getFromParameterized(apiRoutes.courseCategory.getCompanyCourseCategories)
            .query
            .getValue(x => x.companyId, 'int');

        return this._courseCategoryService
            .getCompanyCourseCategoriesAsync(params.principalId, companyId);
    };

    @XControllerAction(apiRoutes.courseCategory.saveCompanyCourseCategories, { isPost: true })
    saveCompanyCourseCategoriesAction(params: ActionParams) {

        const body = params
            .getFromParameterized(apiRoutes.courseCategory.saveCompanyCourseCategories)
            .body;

        const companyId = body.getValue(x => x.companyId, 'int');
        const mutations = body.getValue(x => x.mutations);

        return this
            ._courseCategoryService
            .saveCompanyCourseCategoriesAsync(companyId, mutations);
    }


}