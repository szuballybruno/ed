import { UserInvitationService } from '../services/UserInvitationService';
import { UserEditSaveDTO } from '../shared/dtos/UserEditSaveDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

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