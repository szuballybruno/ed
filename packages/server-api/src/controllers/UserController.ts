import { UserService } from '@episto/server-services';
import { UserEditSaveDTO } from '@episto/communication';
import { UserEditSimpleDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { ServiceProvider } from '../startup/ServiceProvider';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { XController } from '../XTurboExpress/XTurboExpressTypes';

export class UserController implements XController<UserController> {

    private _userService: UserService;

    constructor(serviceProvider: ServiceProvider) {

        this._userService = serviceProvider.getService(UserService);
    }

    @XControllerAction(apiRoutes.user.getAdminUsersList)
    getUserOverviewStatsAction(params: ActionParams) {

        const isToBeReviewed = params
            .getQuery<{ isToBeReviewed: boolean }>()
            .getValue(x => x.isToBeReviewed, 'boolean');

        const companyId = params
            .getQuery<{ companyId?: Id<'Company'> }>()
            .getValueOrNull(x => x.companyId, 'int') ?? null;

        return this._userService
            .getUserAdminListAsync(params.principalId, isToBeReviewed, companyId);
    }

    @XControllerAction(apiRoutes.user.deleteUser, { isPost: true })
    async deleteUserAction(params: ActionParams) {

        const deleteUserId = Id
            .create<'User'>(params
                .getBody()
                .getValue(x => x.userId, 'int'));

        return this._userService
            .deleteUserAsync(params.principalId, deleteUserId);
    }

    @XControllerAction(apiRoutes.user.getEditUserData)
    async getEditUserDataAction(params: ActionParams) {

        const editedUserId = Id
            .create<'User'>(params
                .getQuery()
                .getValue(x => x.editedUserId, 'int'));

        return this._userService
            .getEditUserDataAsync(params.principalId, editedUserId);
    }

    @XControllerAction(apiRoutes.user.saveUserSimple, { isPost: true })
    saveUserSimpleAction(params: ActionParams) {

        const dto = params
            .getBody<UserEditSimpleDTO>(['firstName', 'lastName', 'phoneNumber'])
            .data;

        return this._userService
            .saveUserSimpleAsync(params.principalId, dto);
    }

    @XControllerAction(apiRoutes.user.getUserControlDropdownData)
    userControlDropdownDataAction(params: ActionParams) {

        return this._userService
            .getUserControlDropdownDataAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.user.saveUser, { isPost: true })
    saveUserAction(params: ActionParams) {

        const dto = params
            .getBody<UserEditSaveDTO>(['firstName', 'lastName', 'companyId', 'email', 'userId', 'isTeacher', 'isSurveyRequired'])
            .data;

        return this._userService
            .saveUserAsync(params.principalId, dto);
    }

    @XControllerAction(apiRoutes.user.getBriefUserData)
    async getBriefUserDataAction(params: ActionParams) {

        const userId = Id
            .create<'User'>(params
                .getQuery()
                .getValue(x => x.userId, 'int'));

        return this._userService
            .getBriefUserDataAsync(params.principalId, userId);
    }

    @XControllerAction(apiRoutes.user.saveUserCourses, { isPost: true })
    async saveUserCoursesAsync(params: ActionParams) {

        const data = params
            .getFromParameterized(apiRoutes.user.saveUserCourses);

        await this
            ._userService
            .saveUserCoursesAsync(data.body.getValue(x => x.userId, 'int'), data.body.getValue(x => x.mutations, 'any[]'));
    }
}
