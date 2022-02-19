import { CreateInvitedUserDTO } from "../sharedd/dtos/CreateInvitedUserDTO";
import { RegisterUserViaActivationCodeDTO } from "../sharedd/dtos/RegisterUserViaActivationCodeDTO";
import { RegisterUserViaInvitationTokenDTO } from "../sharedd/dtos/RegisterUserViaInvitationTokenDTO";
import { RegisterUserViaPublicTokenDTO } from "../sharedd/dtos/RegisterUserViaPublicTokenDTO";
import { RoleIdEnum } from "../sharedd/types/sharedTypes";
import { EmailService } from "../services/EmailService";
import { GlobalConfiguration } from "../services/misc/GlobalConfiguration";
import { RegistrationService } from "../services/RegistrationService";
import { TokenService } from "../services/TokenService";
import { UserService } from "../services/UserService";
import { setAuthCookies } from "../utilities/cookieHelpers";
import { ActionParams, ErrorCode } from "../utilities/helpers";

export class RegistrationController {

    private _registrationService: RegistrationService;
    private _userService: UserService;
    private _config: GlobalConfiguration;

    constructor(
        res: RegistrationService,
        userService: UserService,
        config: GlobalConfiguration) {

        this._registrationService = res;
        this._userService = userService;
        this._config = config;
    }

    registerUserViaPublicTokenAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaPublicTokenDTO>()

        const { accessToken, refreshToken } = await this._registrationService
            .registerUserViaPublicTokenAsync(
                body.getValue<string>(x => x.emailAddress),
                body.getValue<string>(x => x.firstName),
                body.getValue<string>(x => x.lastName),
                body.getValue<string>(x => x.registrationToken));

        setAuthCookies(this._config, params.res, accessToken, refreshToken);
    };

    registerUserViaInvitationTokenAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaInvitationTokenDTO>();

        const { accessToken, refreshToken } = await this._registrationService
            .registerInvitedUserAsync(
                body.getValue<string>(x => x.invitationToken),
                body.getValue<string>(x => x.password),
                body.getValue<string>(x => x.passwordCompare));

        setAuthCookies(this._config, params.res, accessToken, refreshToken);
    };

    registerUserViaActivationCodeAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaActivationCodeDTO>();

        await this._registrationService
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
            .getUserById(params.currentUserId);

        // if user is admin require organizationId to be provided
        // otherwise use the current user's organization
        const organizationId = currentUser.roleId === RoleIdEnum.administrator
            ? dto.data.organizationId
            : currentUser.organizationId;

        if (!organizationId)
            throw new ErrorCode(
                `Current user is not an administrator, 
                but has rights to add users, but has no organization, 
                in which he/she could add users.`, "bad request");

        // create user
        await this._registrationService
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