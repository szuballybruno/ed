import { AdminPageUserDTO } from '../../shared/dtos/admin/AdminPageUserDTO';
import { BriefUserDataDTO } from '../../shared/dtos/BriefUserDataDTO';
import { UserEditDTO } from '../../shared/dtos/UserEditDTO';
import { UserEditSimpleDTO } from '../../shared/dtos/UserEditSimpleDTO';
import { UserLearningOverviewDataDTO } from '../../shared/dtos/UserLearningOverviewDataDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { httpPostAsync, usePostDataUnsafe } from '../core/httpClient';

export const useUserListQuery = (searchText: string | null) => {

    const queryResult = useReactQuery2<AdminPageUserDTO[]>(apiRoutes.user.getUserListForAdministration, { searchText });

    return {
        users: queryResult.data ?? [],
        usersStatus: queryResult.state,
        usersError: queryResult.error,
        refetchUsers: queryResult.refetch,
    };
};

export const useSaveUserSimple = () => {

    const postDataResult = usePostDataUnsafe<UserEditSimpleDTO, void>(apiRoutes.user.saveUserSimple);

    return {
        saveUserSimpleState: postDataResult.state,
        saveUserSimpleAsync: postDataResult.postDataAsync
    };
};

export const useSaveUser = () => {

    const queryRes = usePostDataUnsafe<UserEditDTO, void>(apiRoutes.user.saveUser);

    return {
        saveUserStatus: queryRes.state,
        saveUserAsync: queryRes.postDataAsync
    };
};

export const useEditUserData = (editedUserId: Id<'User'> | null) => {

    const queryRes = useReactQuery2<UserEditDTO>(apiRoutes.user.getEditUserData, { editedUserId: editedUserId }, !!editedUserId);

    return {
        userEditData: queryRes.data,
        userEditDataStatus: queryRes.state,
        userEditDataError: queryRes.error,
        refetchEditUserData: queryRes.refetch
    };
};

export const useUserLearningOverviewData = (userId: Id<'User'>) => {

    const queryRes = useReactQuery2<UserLearningOverviewDataDTO>(apiRoutes.userStats.getUserLearningOverviewData, { userId: userId });

    return {
        userLearningOverviewData: queryRes.data,
        userLearningOverviewDataStatus: queryRes.state,
        userLearningOverviewDataError: queryRes.error,
        refetchUserLearningOverviewData: queryRes.refetch
    };
};


export const useBriefUserData = (userId: Id<'User'> | null) => {

    const queryRes = useReactQuery2<BriefUserDataDTO>(apiRoutes.user.getBriefUserData, { userId: userId }, !!userId);

    return {
        briefUserData: queryRes.data,
        briefUserDataStatus: queryRes.state,
        briefUserDataError: queryRes.error
    };
};

export const deleteUserAsync = (userId: Id<'User'>) => {

    return httpPostAsync(apiRoutes.user.deleteUser, { userId });
};