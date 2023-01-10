import { CourseUserPresetType } from "@episto/commontypes";
import { AdminCourseCarouselDataDTO, AdminCourseUserStatsDTO, AdminUserCourseDTO, apiRoutes, CourseAdminListItemDTO, UserAdminListDTO } from "@episto/communication";
import { Id } from "@thinkhub/x-core";
import { QueryService } from "../../static/XQuery/XQueryReact";
import { usePostDataUnsafe } from "../core/httpClient";

const adminRoutes = apiRoutes.admin;

const useAdminCourseStatCarouselDatas = (companyId: Id<'Company'> | null) => {

    const queryRes = QueryService
        .useXQueryArrayParametrized(AdminCourseCarouselDataDTO, adminRoutes.getCourseStatsCarouselData, { companyId: companyId! }, !!companyId);

    return {
        adminOverviewStatsDatas: queryRes.data,
    };
};

const useAdminCourseList = (companyId: Id<'Company'>, isEnabled?: boolean) => {

    const qr = QueryService
        .useXQueryArrayParametrized(CourseAdminListItemDTO, adminRoutes.getAdminCourseList, { companyId }, isEnabled);

    return {
        courses: qr.data ?? [],
        coursesError: qr.error,
        coursesStatus: qr.state,
        refetchCoursesAsync: qr.refetch
    };
};

const useCourseUserStatsData = (courseId: Id<'Course'>) => {

    const queryRes = QueryService.useXQuery<AdminCourseUserStatsDTO[]>(adminRoutes.getAdminCourseUsers, { courseId });

    return {
        courseUserStatsData: queryRes.data,
        courseUserStatsDataStatus: queryRes.state,
        courseUserStatsDataError: queryRes.error
    };
};

const useUserAssignedCourses = (userId: Id<'User'>, loadAvailable: boolean) => {

    const queryRes = QueryService
        .useXQueryArrayParametrized(AdminUserCourseDTO, adminRoutes.getAdminUserCourses, { userId, loadAvailable });

    return {
        userAssignedCourses: queryRes.data,
        userAssignedCoursesState: queryRes.state,
        userAssignedCoursesError: queryRes.error,
        refetchUserAssignedCourses: queryRes.refetch
    };
};

const useUserAdminList = (companyId: Id<'Company'>, isEnabled?: boolean) => {

    const queryRes = QueryService
        .useXQueryArray<UserAdminListDTO>(adminRoutes.getAdminUsersList, { companyId }, isEnabled);

    return {
        userOverviewStats: queryRes.data,
        userOverviewStatsStatus: queryRes.state,
        userOverviewStatsError: queryRes.error,
        refetchOverviewStats: queryRes.refetch
    };
};

const useSaveUserAssignedCourses = () => {

    const qr = usePostDataUnsafe(adminRoutes.saveUserCourses);

    return {
        saveUserCourses: qr.postDataAsync,
        saveUserCoursesState: qr.state
    };
};

export const AdminApiService = {
    useAdminCourseStatCarouselDatas,
    useAdminCourseList,
    useUserAssignedCourses,
    useCourseUserStatsData,
    useUserAdminList,
    useSaveUserAssignedCourses
}