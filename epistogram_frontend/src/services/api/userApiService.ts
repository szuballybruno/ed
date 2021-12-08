import { useReactQuery2 } from "../../static/frontendHelpers";
import { AdminPageUserDTO } from "../../models/shared_models/AdminPageUserDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { UserDTO } from "../../models/shared_models/UserDTO";
import { httpPostAsync, usePostDataUnsafe } from "../core/httpClient";
import { CreateInvitedUserDTO } from "../../models/shared_models/CreateInvitedUserDTO";
import { UserEditDTO } from "../../models/shared_models/UserEditDTO";
import { BriefUserDataDTO } from "../../models/shared_models/BriefUserDataDTO";

export const useUserListQuery = () => {

    const queryResult = useReactQuery2<AdminPageUserDTO[]>(apiRoutes.user.getUserListForAdministration);

    return {
        users: queryResult.data ?? [],
        usersStatus: queryResult.state,
        usersError: queryResult.error,
        refetchUsers: queryResult.refetch,
    };
}

export const useSaveUserData = () => {

    const postDataResult = usePostDataUnsafe<UserDTO, void>(apiRoutes.user.upadateUser);

    const saveUserData = (firstName: string, lastName: string, phoneNumber: string) => {

        return postDataResult.postDataAsync({
            firstName: firstName,
            lastName,
            phoneNumber
        } as UserDTO);
    }

    return {
        saveUserDataState: postDataResult.state,
        saveUserData
    }
}

export const inviteUserAsync = (dto: CreateInvitedUserDTO) => {

    return httpPostAsync(apiRoutes.user.inviteUser, dto);
}

export const useEditUserData = (editedUserId: number) => {

    const queryRes = useReactQuery2<UserEditDTO>(apiRoutes.user.getEditUserData, { editedUserId: editedUserId });

    return {
        userEditData: queryRes.data,
        userEditDataStatus: queryRes.state,
        userEditDataError: queryRes.error
    }
}

export const useBriefUserData = (userId: number | null) => {

    const queryRes = useReactQuery2<BriefUserDataDTO>(apiRoutes.user.getBriefUserData, { userId: userId }, !!userId);

    return {
        briefUserData: queryRes.data,
        briefUserDataStatus: queryRes.state,
        briefUserDataError: queryRes.error
    }
}

export const useUpdateUser = () => {

    const queryRes = usePostDataUnsafe<UserEditDTO, void>(apiRoutes.user.upadateUser);

    return {
        updateUserStatus: queryRes.state,
        updateUserAsync: queryRes.postDataAsync
    }
}

export const deleteUserAsync = (userId: number) => {

    return httpPostAsync(apiRoutes.user.deleteUser, { userId });
}