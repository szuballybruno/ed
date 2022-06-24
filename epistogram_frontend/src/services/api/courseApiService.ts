import { CourseAdminListItemDTO } from '../../shared/dtos/admin/CourseAdminListItemDTO';
import { CourseContentAdminDTO } from '../../shared/dtos/admin/CourseContentAdminDTO';
import { CourseBriefData } from '../../shared/dtos/CourseBriefData';
import { CourseDetailsDTO } from '../../shared/dtos/CourseDetailsDTO';
import { CourseDetailsEditDataDTO } from '../../shared/dtos/CourseDetailsEditDataDTO';
import { CourseProgressShortDTO } from '../../shared/dtos/CourseProgressShortDTO';
import { CourseShortDTO } from '../../shared/dtos/CourseShortDTO';
import { CreateCourseDTO } from '../../shared/dtos/CreateCourseDTO';
import { IdResultDTO } from '../../shared/dtos/IdResultDTO';
import { UserCoursesDataDTO } from '../../shared/dtos/UserCoursesDataDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { CourseModeType } from '../../shared/types/sharedTypes';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { usePostDataUnsafe, usePostMultipartDataUnsafe } from '../core/httpClient';
import { CourseContentItemAdminDTO } from '../../shared/dtos/admin/CourseContentItemAdminDTO';
import { Mutation } from '../../shared/dtos/mutations/Mutation';
import { CoursePermissionAssignDTO } from '../../shared/dtos/CoursePermissionAssignDTO';

export const usePermissionAssignCourses = (userId: number) => {

    const qr = useReactQuery2<CoursePermissionAssignDTO[]>(apiRoutes.course.getPermissionAssignCourses, { userId });

    return {
        permissionAssignCourses: qr.data ?? [],
    };
};

export const useAdminCourseList = (searchText: string) => {

    const qr = useReactQuery2<CourseAdminListItemDTO[]>(apiRoutes.course.getAdminCourseList, { searchText });

    return {
        courses: qr.data ?? [],
        coursesError: qr.error,
        coursesStatus: qr.state,
        refetchCoursesAsync: qr.refetch
    };
};

export const useSetCourseMode = () => {

    const qr = usePostDataUnsafe<{ courseId: number, mode: CourseModeType }, void>(apiRoutes.course.setCourseMode);

    return {
        setCourseModeAsync: qr.postDataAsync,
        setCourseModeState: qr.state
    };
};

export const useSetRequiredCompletionDate = () => {

    const qr = usePostDataUnsafe<{ courseId: number, requiredCourseCompletionDate: string }, void>(apiRoutes.course.setRequiredCompletionDate);

    return {
        setRequiredCourseCompletionDateAsync: qr.postDataAsync,
        setRequiredCourseCompletionDateState: qr.state
    };
};

export const useCourseDetailsEditData = (courseId: number) => {

    const qr = useReactQuery2<CourseDetailsEditDataDTO>(apiRoutes.course.getCourseDetailsEditData, { courseId });

    return {
        courseDetailsEditData: qr.data,
        courseDetailsEditDataError: qr.error,
        courseDetailsEditDataState: qr.state,
        refetchCourseDetailsEditData: qr.refetch
    };
};

export const useCourseContentAdminData = (courseId: number, isEnabled: boolean, loadDeleted: boolean) => {

    const qr = useReactQuery2<CourseContentAdminDTO>(apiRoutes.course.getCourseContentEditData, { courseId, loadDeleted }, isEnabled);

    return {
        courseContentAdminData: qr.data,
        courseContentAdminDataError: qr.error,
        courseContentAdminDataState: qr.state,
        refetchCourseContentAdminData: qr.refetch
    };
};

export const useCreateCourse = () => {

    const qr = usePostDataUnsafe<CreateCourseDTO, void>(apiRoutes.course.createCourse);

    return {
        createCourseAsync: qr.postDataAsync,
        createCourseState: qr.state,
    };
};

export const useDeleteCourse = () => {

    const qr = usePostDataUnsafe<IdResultDTO, void>(apiRoutes.course.deleteCourse);

    return {
        deleteCourseAsync: qr.postDataAsync,
        deleteCourseState: qr.state,
    };
};

export const useSaveCourseDetailsData = () => {

    const qr = usePostDataUnsafe<CourseDetailsEditDataDTO, void>(apiRoutes.course.saveCourseDetails);

    return {
        saveCourseDataAsync: qr.postDataAsync,
        saveCourseDataState: qr.state,
    };
};

export const useSaveCourseContentData = () => {

    const qr = usePostDataUnsafe<{
        courseId: number,
        mutations: Mutation<CourseContentItemAdminDTO, 'versionCode'>[]
    }, void>(apiRoutes.course.saveCourseContent);

    return {
        saveCourseDataAsync: qr.postDataAsync,
        saveCourseDataState: qr.state,
    };
};

export const useUploadCourseThumbnailAsync = () => {

    const qr = usePostMultipartDataUnsafe<{ courseId: number }>(apiRoutes.course.saveCourseThumbnail);

    return {
        saveCourseThumbnailAsync: (courseId: number, file: File) => qr.postMultipartDataAsync({ courseId }, file),
        saveCourseThumbnailState: qr.state,
    };
};

export const useCourseBriefData = (courseId: number | null) => {

    const qr = useReactQuery2<CourseBriefData>(apiRoutes.course.getCourseBriefData, { courseId }, !!courseId);

    return {
        courseBriefData: qr.data,
        courseBriefDataError: qr.error,
        courseBriefDataState: qr.state
    };
};

export const useCourseDetails = (courseId: number) => {

    const qr = useReactQuery2<CourseDetailsDTO>(apiRoutes.course.getCourseDetails, { courseId });

    return {
        courseDetails: qr.data
    };
};

export const useUserCourses = () => {

    const qr = useReactQuery2<CourseShortDTO[]>(apiRoutes.course.getAvailableCourses);

    return {
        courses: qr.data ?? [],
        coursesError: qr.error,
        coursesState: qr.state
    };
};

export const useUserCourseData = () => {

    const qr = useReactQuery2<UserCoursesDataDTO>(apiRoutes.course.getCourseProgressData);

    return {
        coursesData: qr.data,
        coursesDataError: qr.error,
        coursesDataStatus: qr.state
    };
};

export const useCourseProgressShortDtos = () => {

    const qr = useReactQuery2<CourseProgressShortDTO[]>(apiRoutes.course.getCourseProgressShort);

    return {
        courseProgressShortDtos: qr.data ?? [],
        courseProgressShortError: qr.error,
        courseProgressShortState: qr.state
    };
};