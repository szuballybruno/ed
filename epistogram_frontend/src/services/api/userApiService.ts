import { AdminPageUserDTO } from '../../shared/dtos/admin/AdminPageUserDTO';
import { BriefUserDataDTO } from '../../shared/dtos/BriefUserDataDTO';
import { UserEditDTO } from '../../shared/dtos/UserEditDTO';
import { UserEditSimpleDTO } from '../../shared/dtos/UserEditSimpleDTO';
import { UserLearningOverviewDataDTO } from '../../shared/dtos/UserLearningOverviewDataDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { QueryService } from '../../static/QueryService';
import { httpPostAsync, usePostDataUnsafe } from '../core/httpClient';

const useSaveUserAssignedCourses = () => {

    const qr = usePostDataUnsafe(apiRoutes.user.saveUserCourses);

    return {
        saveUserCourses: qr.postDataAsync,
        saveUserCoursesState: qr.state
    };
};

export const UserApiService = {

    useSaveUserAssignedCourses,
    useUserListQuery: (searchText: string | null) => {

        const queryResult = QueryService.useXQuery<AdminPageUserDTO[]>(apiRoutes.user.getUserListForAdministration, { searchText });

        return {
            users: queryResult.data ?? [],
            usersStatus: queryResult.state,
            usersError: queryResult.error,
            refetchUsers: queryResult.refetch,
        };
    },

    useSaveUserSimple: () => {

        const postDataResult = usePostDataUnsafe<UserEditSimpleDTO, void>(apiRoutes.user.saveUserSimple);

        return {
            saveUserSimpleState: postDataResult.state,
            saveUserSimpleAsync: postDataResult.postDataAsync
        };
    },

    useSaveUser: () => {

        const queryRes = usePostDataUnsafe<UserEditDTO, void>(apiRoutes.user.saveUser);

        return {
            saveUserStatus: queryRes.state,
            saveUserAsync: queryRes.postDataAsync
        };
    },

    useEditUserData: (editedUserId: Id<'User'> | null) => {

        const queryRes = QueryService.useXQuery<UserEditDTO>(apiRoutes.user.getEditUserData, { editedUserId: editedUserId }, !!editedUserId);

        return {
            userEditData: queryRes.data,
            userEditDataStatus: queryRes.state,
            userEditDataError: queryRes.error,
            refetchEditUserData: queryRes.refetch
        };
    },

    useUserLearningOverviewData: (userId: Id<'User'>) => {

        const queryRes = QueryService.useXQuery<UserLearningOverviewDataDTO>(apiRoutes.userStats.getUserLearningOverviewData, { userId: userId });

        return {
            userLearningOverviewData: queryRes.data,
            userLearningOverviewDataStatus: queryRes.state,
            userLearningOverviewDataError: queryRes.error,
            refetchUserLearningOverviewData: queryRes.refetch
        };
    },

    useBriefUserData: (userId: Id<'User'> | null) => {

        const queryRes = QueryService.useXQuery<BriefUserDataDTO>(apiRoutes.user.getBriefUserData, { userId: userId }, !!userId);

        return {
            briefUserData: queryRes.data,
            briefUserDataStatus: queryRes.state,
            briefUserDataError: queryRes.error
        };
    },

    deleteUserAsync: (userId: Id<'User'>) => {

        return httpPostAsync(apiRoutes.user.deleteUser, { userId });
    }
};