import { useReactQuery } from "../frontendHelpers";
import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { UserEditDTO } from "../models/shared_models/UserEditDTO";
import { httpGetAsync, httpPostAsync } from "./httpClient";

export const inviteUserAsync = (dto: CreateInvitedUserDTO) => {

    return httpPostAsync(apiRoutes.userManagement.inviteUser, dto);
}

export const useEditUserData = (editedUserId: number) => {

    const queryRes = useReactQuery<UserEditDTO>(
        ["userEditDataQuery"],
        () => httpGetAsync(apiRoutes.userManagement.getEditUserData, { editedUserId: editedUserId }));

    return {
        userEditData: queryRes.data,
        userEditDataStatus: queryRes.status,
        userEditDataError: queryRes.error
    }
}