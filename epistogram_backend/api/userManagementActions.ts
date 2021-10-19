import { User } from "../models/entity/User";
import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import { UserEditDTO } from "../models/shared_models/UserEditDTO";
import { getAdminPageUsersList } from "../services/adminService";
import { toUserEditDTO } from "../services/mappings";
import { createInvitedUserAsync } from "../services/signupService";
import { deleteUserAsync } from "../services/userManagementService";
import { staticProvider } from "../staticProvider";
import { ActionParamsType, withValueOrBadRequest } from "../utilities/helpers";

export const deleteUserAction = async (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<any>(params.req.body);
    const deleteUserId = withValueOrBadRequest<number>(dto.userId);

    return deleteUserAsync(params.userId, deleteUserId);
};

export const getEditUserDataAction = async (params: ActionParamsType) => {

    const editedUserId = withValueOrBadRequest<number>(params.req.query?.editedUserId);

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

export const updateUserAction = async (params: ActionParamsType) => {

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

export const getUserAdministrationUserListAction = async () => {

    return await getAdminPageUsersList();
};

export const inviteUserAction = async (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<CreateInvitedUserDTO>(params.req.body);

    await createInvitedUserAsync(dto, params.userId);
};