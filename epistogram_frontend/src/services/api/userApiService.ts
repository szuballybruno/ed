import { AdminPageUserDTO } from "../../models/shared_models/AdminPageUserDTO";
import { BriefUserDataDTO } from "../../models/shared_models/BriefUserDataDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { UserEditDTO } from "../../models/shared_models/UserEditDTO";
import { UserEditSimpleDTO } from "../../models/shared_models/UserEditSimpleDTO";
import { useReactQuery2 } from "../../static/frontendHelpers";
import { httpPostAsync, usePostDataUnsafe } from "../core/httpClient";

export const useUserListQuery = (searchText: string | null) => {

    const queryResult = useReactQuery2<AdminPageUserDTO[]>(apiRoutes.user.getUserListForAdministration, { searchText });

    return {
        users: queryResult.data ?? [],
        usersStatus: queryResult.state,
        usersError: queryResult.error,
        refetchUsers: queryResult.refetch,
    };
}

export const useSaveUserSimple = () => {

    const postDataResult = usePostDataUnsafe<UserEditSimpleDTO, void>(apiRoutes.user.saveUserSimple);

    return {
        saveUserSimpleState: postDataResult.state,
        saveUserSimpleAsync: postDataResult.postDataAsync
    }
}

export const useSaveUser = () => {

    const queryRes = usePostDataUnsafe<UserEditDTO, void>(apiRoutes.user.saveUser);

    return {
        saveUserStatus: queryRes.state,
        saveUserAsync: queryRes.postDataAsync
    }
}

export const useEditUserData = (editedUserId: number) => {

    const queryRes = useReactQuery2<UserEditDTO>(apiRoutes.user.getEditUserData, { editedUserId: editedUserId });

    return {
        userEditData: queryRes.data,
        userEditDataStatus: queryRes.state,
        userEditDataError: queryRes.error,
        refetchEditUserData: queryRes.refetch
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

export const deleteUserAsync = (userId: number) => {

    return httpPostAsync(apiRoutes.user.deleteUser, { userId });
}