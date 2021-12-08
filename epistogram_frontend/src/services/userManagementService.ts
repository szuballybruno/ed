import { useReactQuery } from "../frontendHelpers";
import { BriefUserDataDTO } from "../models/shared_models/BriefUserDataDTO";
import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { UserEditDTO } from "../models/shared_models/UserEditDTO";
import { httpGetAsync, httpPostAsync, usePostDataUnsafe } from "./core/httpClient";

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

export const useBriefUserData = (userId: number | null) => {

    const queryRes = useReactQuery<BriefUserDataDTO>(
        ["briefUserDataQuery", userId],
        () => httpGetAsync(apiRoutes.userManagement.getBriefUserData, { userId: userId }),
        !!userId);

    return {
        briefUserData: queryRes.data,
        briefUserDataStatus: queryRes.status,
        briefUserDataError: queryRes.error
    }
}

export const useUpdateUser = () => {

    const queryRes = usePostDataUnsafe<UserEditDTO, void>(apiRoutes.userManagement.upadateUser);

    return {
        updateUserStatus: queryRes.state,
        updateUserAsync: queryRes.postDataAsync
    }
}