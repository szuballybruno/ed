import { apiRoutes } from '@episto/communication';
import { AdminStatsService, CourseService, UserService, UserStatsService } from '@episto/server-services';
import { IXGatewayServiceProvider, XControllerAction } from '@episto/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { IController } from '../interfaces/IController';

const adminRoutes = apiRoutes.admin;

export class AdminController implements IController<AdminController> {

    private _adminStatsService: AdminStatsService;
    private _courseService: CourseService;
    private _userService: UserService;
    private _userStatsService: UserStatsService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._adminStatsService = serviceProvider
            .getService(AdminStatsService);

        this._courseService = serviceProvider
            .getService(CourseService);

        this._userService = serviceProvider
            .getService(UserService);

        this._userStatsService = serviceProvider
            .getService(UserStatsService);
    }

    @XControllerAction(adminRoutes.getCourseStatsCarouselData)
    async getCourseStatsCarouselDataAction(params: ActionParams) {

        const paramsdata = params
            .getFromParameterized(adminRoutes.getCourseStatsCarouselData);

        const companyId = paramsdata
            .query
            .getValue(x => x.companyId, 'int');

        return await this
            ._adminStatsService
            .getCourseStatsCarouselDataAsync(params.principalId, companyId);
    }

    @XControllerAction(adminRoutes.getAdminCourseList)
    getAdminCourseListAction = (params: ActionParams) => {

        const data = params
            .getFromParameterized(adminRoutes.getAdminCourseList);

        const companyId = data.query.getValue(x => x.companyId, 'int');

        return this._courseService
            .getAdminCoursesAsync(params.principalId, companyId);
    };


    @XControllerAction(adminRoutes.saveUserCourses, { isPost: true })
    async saveUserCoursesAsync(params: ActionParams) {

        const data = params
            .getFromParameterized(adminRoutes.saveUserCourses);

        await this
            ._userService
            .saveUserCoursesAsync(data.body.getValue(x => x.userId, 'int'), data.body.getValue(x => x.mutations, 'any[]'));
    }

    @XControllerAction(adminRoutes.getAdminUsersList)
    getUserOverviewStatsAction(params: ActionParams) {

        const query = params
            .getFromParameterized(adminRoutes.getAdminUsersList)
            .query;

        //const isToBeReviewed = query.getValue(x => x.isToBeReviewed)
        const companyId = query.getValue(x => x.companyId)

        return this._userService
            .getUserAdminListAsync(params.principalId, companyId);
    }

    @XControllerAction(adminRoutes.getAdminUserCourses)
    getUserCourseStatsAction(params: ActionParams) {

        const query = params
            .getFromParameterized(adminRoutes.getAdminUserCourses)
            .query;

        const userId = query.getValue(x => x.userId, 'int')
        const loadAvailable = query.getValue(x => x.loadAvailable, 'boolean')

        return this._userStatsService
            .getUserCourseStatsAsync(
                params.principalId,
                userId,
                loadAvailable);
    }

    @XControllerAction(adminRoutes.getAdminCourseUsers)
    getCourseUserStatsAction(params: ActionParams) {

        const query = params
            .getFromParameterized(adminRoutes.getAdminCourseUsers)
            .query;

        return this._userStatsService
            .getCourseUserStatsAsync(
                params.principalId,
                query.getValue(x => x.courseId, 'int'),
                query.getValue(x => x.preset));
    }
}