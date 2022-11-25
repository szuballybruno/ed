import { UserInvitationService } from '@episto/server-services';
import { UserEditSaveDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { ServiceProvider } from '../startup/ServiceProvider';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { XController } from '../XTurboExpress/XTurboExpressTypes';

export class InvitationController implements XController<InvitationController> {

    private _userInvitationService: UserInvitationService;

    constructor(serviceProvider: ServiceProvider) {

        this._userInvitationService = serviceProvider.getService(UserInvitationService);
    }

    @XControllerAction(apiRoutes.invitation.inviteUser, { isPost: true })
    inviteUserAction(params: ActionParams) {

        const dto = params
            .getBody<UserEditSaveDTO>([
                'companyId',
                'email',
                'firstName',
                'lastName',
                'departmentId',
                'isSurveyRequired',
                'assignedRoleIds',
                'isTeacher',
                'userId',
            ]).data;

        return this._userInvitationService
            .inviteUserAsync(params.principalId, dto);
    }
}
