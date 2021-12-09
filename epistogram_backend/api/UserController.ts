import { User } from "../models/entity/User";
import { BriefUserDataDTO } from "../models/shared_models/BriefUserDataDTO";
import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import { UserEditDTO } from "../models/shared_models/UserEditDTO";
import { getAdminPageUsersList } from "../services/adminService";
import { toUserEditDTO } from "../services/mappings";
import { SignupService } from "../services/SignupService";
import { deleteUserAsync } from "../services/userService";
import { staticProvider } from "../staticProvider";
import { ActionParams, getFullName, withValueOrBadRequest } from "../utilities/helpers";

export class UserController {

    private _signupService: SignupService;

    constructor(signupService: SignupService) {

        this._signupService = signupService;
    }

    deleteUserAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<any>(params.req.body);
        const deleteUserId = withValueOrBadRequest<number>(dto.userId, "number");

        return deleteUserAsync(params.userId, deleteUserId);
    };

    getEditUserDataAction = async (params: ActionParams) => {

        const editedUserId = withValueOrBadRequest<number>(params.req.query?.editedUserId, "number");

        const user = await staticProvider
            .ormConnection
            .getRepository(User)
            .createQueryBuilder("u")
            .leftJoinAndSelect("u.organization", "o")
            .leftJoinAndSelect("u.role", "r")
            .leftJoinAndSelect("u.jobTitle", "jt")
            .where("u.id = :userId", { userId: editedUserId })
            .getOneOrFail();

        return toUserEditDTO(user);
    }

    updateUserAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<UserEditDTO>(params.req.body);

        await staticProvider
            .ormConnection
            .getRepository(User)
            .save({
                id: dto.id,
                lastName: dto.lastName,
                firstName: dto.firstName,
                email: dto.email,
                organizationId: dto.organization?.id,
                roleId: dto.role?.id,
                jobTitleId: dto.jobTitle?.id
            })
    }

    getUserAdministrationUserListAction = async () => {

        return await getAdminPageUsersList();
    };

    getBriefUserDataAction = async (params: ActionParams) => {

        const userId = withValueOrBadRequest(params.req?.query?.userId);

        const user = await staticProvider
            .ormConnection
            .getRepository(User)
            .findOneOrFail({
                where: {
                    id: userId
                }
            });

        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: getFullName(user)
        } as BriefUserDataDTO;
    }

    inviteUserAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<CreateInvitedUserDTO>(params.req.body);

        await this._signupService
            .createInvitedUserAsync(dto, params.userId);
    };
}