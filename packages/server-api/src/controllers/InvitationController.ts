import { UserInvitationService } from '@episto/server-services';
import { UserEditSaveDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { IXGatewayServiceProvider } from '@thinkhub/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@thinkhub/x-gateway';
import { IController } from '../interfaces/IController';

export class InvitationController implements IController<InvitationController> {

    private _userInvitationService: UserInvitationService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

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
