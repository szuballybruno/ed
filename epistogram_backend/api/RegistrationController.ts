import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import { RegisterUserViaActivationCodeDTO } from "../models/shared_models/RegisterUserViaActivationCodeDTO";
import { RegisterUserViaInvitationTokenDTO } from "../models/shared_models/RegisterUserViaInvitationTokenDTO";
import { RegisterUserViaPublicTokenDTO } from "../models/shared_models/RegisterUserViaPublicTokenDTO";
import { RoleIdEnum } from "../models/shared_models/types/sharedTypes";
import { RegistrationService } from "../services/RegistrationService";
import { UserService } from "../services/UserService2";
import { setAuthCookies } from "../utilities/cookieHelpers";
import { ActionParams, TypedError } from "../utilities/helpers";

export class RegistrationController {

    private _res: RegistrationService;
    private _userService: UserService;

    constructor(res: RegistrationService, userService: UserService) {

        this._res = res;
        this._userService = userService;
    }

    registerUserViaPublicTokenAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaPublicTokenDTO>()

        const { accessToken, refreshToken } = await this._res
            .registerUserViaPublicTokenAsync(
                body.getValue<string>(x => x.emailAddress),
                body.getValue<string>(x => x.firstName),
                body.getValue<string>(x => x.lastName),
                body.getValue<string>(x => x.registrationToken));

        setAuthCookies(params.res, accessToken, refreshToken);
    };

    registerUserViaInvitationTokenAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaInvitationTokenDTO>();

        const { accessToken, refreshToken } = await this._res
            .registerInvitedUserAsync(
                body.getValue<string>(x => x.invitationToken),
                body.getValue<string>(x => x.password),
                body.getValue<string>(x => x.passwordCompare));

        setAuthCookies(params.res, accessToken, refreshToken);
    };

    registerUserViaActivationCodeAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaActivationCodeDTO>();

        await this._res
            .registerUserViaActivationCodeAsync(
                body.getValue<string>(x => x.activationCode),
                body.getValue<string>(x => x.emailAddress),
                body.getValue<string>(x => x.firstName),
                body.getValue<string>(x => x.lastName));
    };

    inviteUserAction = async (params: ActionParams) => {

        const dto = params.getBody<CreateInvitedUserDTO>();

        // handle organizationId
        const currentUser = await this._userService
            .getUserById(params.userId);

        // if user is admin require organizationId to be provided
        // otherwise use the current user's organization
        const organizationId = currentUser.roleId === RoleIdEnum.administrator
            ? dto.data.organizationId
            : currentUser.organizationId;

        if (!organizationId)
            throw new TypedError(
                `Current user is not an administrator, 
                but has rights to add users, but has no organization, 
                in which he/she could add users.`, "bad request");

        // create user
        await this._res
            .createInvitedUserAsync({
                email: dto.getValue<string>(x => x.email),
                jobTitleId: dto.getValue<number>(x => x.jobTitleId),
                firstName: dto.getValue<string>(x => x.firstName),
                lastName: dto.getValue<string>(x => x.lastName),
                roleId: dto.getValue<number>(x => x.roleId),
                organizationId,
            });
    };
}