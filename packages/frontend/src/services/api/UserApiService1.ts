import { Id } from '@episto/commontypes';
import { apiRoutes, BriefUserDataDTO, UserControlDropdownDataDTO, UserEditReadDTO, UserEditSaveDTO, UserEditSimpleDTO, UserLearningOverviewDataDTO } from '@episto/communication';
import { QueryService } from '../../static/XQuery/XQueryReact';
import { usePostDataUnsafe } from '../core/httpClient';

const useEditUserData = (editedUserId: Id<'User'> | null) => {

    const queryRes = QueryService
        .useXQuery<UserEditReadDTO>(apiRoutes.user.getEditUserData, { editedUserId }, !!editedUserId);

    return {
        userEditData: queryRes.data,
        userEditDataStatus: queryRes.state,
        userEditDataError: queryRes.error,
        refetchEditUserData: queryRes.refetch
    };
};

const useUserIsTeacher = (editedUserId: Id<'User'> | null) => {

    const queryRes = QueryService.useXQuery<UserEditReadDTO>(apiRoutes.user.getEditUserData, { editedUserId: editedUserId }, !!editedUserId);

    return {
        userIsTeacher: queryRes.data?.isTeacher ?? false,
        userIsTeacherStatus: queryRes.state,
        userIsTeacherError: queryRes.error,
        refetchUserIsTeacher: queryRes.refetch
    };
};

const useUserControlDropdownData = () => {

    const queryRes = QueryService
        .useXQuery<UserControlDropdownDataDTO>(apiRoutes.user.getUserControlDropdownData);

    return {
        userControlDropdownData: queryRes.data,
        userControlDropdownDataStatus: queryRes.state,
        userControlDropdownDataError: queryRes.error,
        refetchUserControlDropdownData: queryRes.refetch
    };
};

export const UserApiService = {
    useUserControlDropdownData,

    useSaveUserSimple: () => {

        const postDataResult = usePostDataUnsafe<UserEditSimpleDTO, void>(apiRoutes.user.saveUserSimple);

        return {
            saveUserSimpleState: postDataResult.state,
            saveUserSimpleAsync: postDataResult.postDataAsync
        };
    },

    useSaveUser: () => {

        const queryRes = usePostDataUnsafe<UserEditSaveDTO, void>(apiRoutes.user.saveUser);

        return {
            saveUserStatus: queryRes.state,
            saveUserAsync: queryRes.postDataAsync
        };
    },

    useEditUserData,
    useUserIsTeacher,

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

    useDeleteUserAsync: () => {

        const { postDataAsync } = usePostDataUnsafe(apiRoutes.user.deleteUser);

        return {
            deleteUserAsync: postDataAsync
        };
    }
};