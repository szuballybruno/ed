import { UserInvitationService } from '../services/UserInvitationService';
import { CreateInvitedUserDTO } from '../shared/dtos/CreateInvitedUserDTO';
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
    async inviteUserAction(params: ActionParams) {

        const dto = params
            .getBody<CreateInvitedUserDTO>([
                'companyId',
                'email',
                'firstName',
                'lastName',
                'departmentId',
            ]).data;

        return await this._userInvitationService
            .inviteUserAsync(params.principalId, dto);
    }
}
