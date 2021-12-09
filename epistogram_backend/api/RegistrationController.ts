import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import { RegisterUserViaActivationCodeDTO } from "../models/shared_models/RegisterUserViaActivationCodeDTO";
import { RegisterUserViaInvitationTokenDTO } from "../models/shared_models/RegisterUserViaInvitationTokenDTO";
import { RegisterUserViaPublicTokenDTO } from "../models/shared_models/RegisterUserViaPublicTokenDTO";
import { RoleIdEnum } from "../models/shared_models/types/sharedTypes";
import { RegistrationService } from "../services/RegistrationService";
import { getUserById } from "../services/userService";
import { setAuthCookies } from "../utilities/cookieHelpers";
import { ActionParams, TypedError } from "../utilities/helpers";

export class RegistrationController {

    private _res: RegistrationService;

    constructor(res: RegistrationService) {

        this._res = res;
    }

    registerUserViaPublicTokenAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaPublicTokenDTO>()

        const { accessToken, refreshToken } = await this._res
            .registerUserViaPublicTokenAsync(
                body.getBodyValue<string>(x => x.emailAddress),
                body.getBodyValue<string>(x => x.firstName),
                body.getBodyValue<string>(x => x.lastName),
                body.getBodyValue<string>(x => x.registrationToken));

        setAuthCookies(params.res, accessToken, refreshToken);
    };

    registerUserViaInvitationTokenAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaInvitationTokenDTO>();

        const { accessToken, refreshToken } = await this._res
            .registerInvitedUserAsync(
                body.getBodyValue<string>(x => x.invitationToken),
                body.getBodyValue<string>(x => x.password),
                body.getBodyValue<string>(x => x.passwordCompare));

        setAuthCookies(params.res, accessToken, refreshToken);
    };

    registerUserViaActivationCodeAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaActivationCodeDTO>();

        await this._res
            .registerUserViaActivationCodeAsync(
                body.getBodyValue<string>(x => x.activationCode),
                body.getBodyValue<string>(x => x.emailAddress),
                body.getBodyValue<string>(x => x.firstName),
                body.getBodyValue<string>(x => x.lastName));
    };

    inviteUserAction = async (params: ActionParams) => {

        const dto = params.getBody<CreateInvitedUserDTO>();

        // handle organizationId
        const currentUser = await getUserById(params.userId);

        // if user is admin require organizationId to be provided
        // otherwise use the current user's organization
        const organizationId = currentUser.roleId === RoleIdEnum.administrator
            ? dto.bodyData.organizationId
            : currentUser.organizationId;

        if (!organizationId)
            throw new TypedError(
                `Current user is not an administrator, 
                but has rights to add users, but has no organization, 
                in which he/she could add users.`, "bad request");

        // create user
        await this._res
            .createInvitedUserAsync({
                email: dto.getBodyValue<string>(x => x.email),
                jobTitleId: dto.getBodyValue<number>(x => x.jobTitleId),
                firstName: dto.getBodyValue<string>(x => x.firstName),
                lastName: dto.getBodyValue<string>(x => x.lastName),
                roleId: dto.getBodyValue<number>(x => x.roleId),
                organizationId,
            });
    };
}