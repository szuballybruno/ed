import { CourseAdminListItemDTO } from '@episto/communication';
import { CourseContentAdminDTO } from '@episto/communication';
import { SaveCourseContentDTO } from '@episto/communication';
import { AvailableCourseDTO } from '@episto/communication';
import { CourseBriefData } from '@episto/communication';
import { CourseCategoryDTO } from '@episto/communication';
import { CourseDetailsDTO } from '@episto/communication';
import { CourseDetailsEditDataDTO } from '@episto/communication';
import { CoursePermissionAssignDTO } from '@episto/communication';
import { CourseStartDTO } from '@episto/communication';
import { CreateCourseDTO } from '@episto/communication';
import { IdResultDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { CourseModeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { QueryService } from '../../static/XQuery/XQueryReact';
import { usePostDataUnsafe, usePostMultipartDataUnsafe } from '../core/httpClient';

const usePermissionAssignCourses = (userId: Id<'User'>) => {

    const qr = QueryService.useXQuery<CoursePermissionAssignDTO[]>(apiRoutes.course.getPermissionAssignCourses, { userId });

    return {
        permissionAssignCourses: qr.data ?? [],
    };
};

const useAdminCourseList = (searchText: string) => {

    const qr = QueryService.useXQuery<CourseAdminListItemDTO[]>(apiRoutes.course.getAdminCourseList, { searchText });

    return {
        courses: qr.data ?? [],
        coursesError: qr.error,
        coursesStatus: qr.state,
        refetchCoursesAsync: qr.refetch
    };
};

const useSetCourseMode = () => {

    const qr = usePostDataUnsafe<{ courseId: Id<'Course'>, mode: CourseModeType }, void>(apiRoutes.course.setCourseMode);

    return {
        setCourseModeAsync: qr.postDataAsync,
        setCourseModeState: qr.state
    };
};

const useCourseDetailsEditData = (courseId: Id<'Course'>) => {

    const qr = QueryService.useXQuery<CourseDetailsEditDataDTO>(apiRoutes.course.getCourseDetailsEditData, { courseId });

    return {
        courseDetailsEditData: qr.data,
        courseDetailsEditDataError: qr.error,
        courseDetailsEditDataState: qr.state,
        refetchCourseDetailsEditData: qr.refetch
    };
};

const useCourseContentAdminData = (courseId: Id<'Course'>, isEnabled: boolean, loadDeleted: boolean) => {

    const qr = QueryService.useXQuery<CourseContentAdminDTO>(apiRoutes.course.getCourseContentEditData, { courseId, loadDeleted }, isEnabled);

    return {
        courseContentAdminData: qr.data,
        courseContentAdminDataError: qr.error,
        courseContentAdminDataState: qr.state,
        refetchCourseContentAdminData: qr.refetch
    };
};

const useCreateCourse = () => {

    const qr = usePostDataUnsafe<CreateCourseDTO, void>(apiRoutes.course.createCourse);

    return {
        createCourseAsync: qr.postDataAsync,
        createCourseState: qr.state,
    };
};

const useDeleteCourse = () => {

    const qr = usePostDataUnsafe<IdResultDTO, void>(apiRoutes.course.deleteCourse);

    return {
        deleteCourseAsync: qr.postDataAsync,
        deleteCourseState: qr.state,
    };
};

const useSaveCourseDetailsData = () => {

    const qr = usePostDataUnsafe<CourseDetailsEditDataDTO, void>(apiRoutes.course.saveCourseDetails);

    return {
        saveCourseDataAsync: qr.postDataAsync,
        saveCourseDataState: qr.state,
    };
};

const useSaveCourseContentData = () => {

    const qr = usePostMultipartDataUnsafe<SaveCourseContentDTO>(apiRoutes.course.saveCourseContent);

    return {
        saveCourseDataAsync: qr.postMultipartDataAsync,
        saveCourseDataState: qr.state,
    };
};

const useStartCourse = () => {

    const qr = usePostDataUnsafe<CourseStartDTO, void>(apiRoutes.course.startCourse);

    return {
        startCourse: qr.postDataAsync,
        startCourseState: qr.state,
    };
};

const useUploadCourseThumbnailAsync = () => {

    const qr = usePostMultipartDataUnsafe<{ courseId: Id<'Course'> }>(apiRoutes.course.saveCourseThumbnail);

    return {
        saveCourseThumbnailAsync: (courseId: Id<'Course'>, file: File) => qr.postMultipartDataAsync({ data: { courseId }, files: { file } }),
        saveCourseThumbnailState: qr.state,
    };
};

const useCourseBriefData = (courseId: Id<'Course'> | null) => {

    const qr = QueryService.useXQuery<CourseBriefData>(apiRoutes.course.getCourseBriefData, { courseId }, !!courseId);

    return {
        courseBriefData: qr.data,
        courseBriefDataError: qr.error,
        courseBriefDataState: qr.state
    };
};

const useCourseDetails = (courseId: Id<'Course'>) => {

    const qr = QueryService.useXQuery<CourseDetailsDTO>(apiRoutes.course.getCourseDetails, { courseId });

    return {
        courseDetails: qr.data
    };
};

const useUserCourses = (
    searchTerm: string | null,
    filterCategoryId: Id<'CourseCategory'> | null,
    isFeatured: boolean,
    isRecommended: boolean,
    orderBy: string | null
) => {

    const qr = QueryService.useXQueryArray<AvailableCourseDTO>(apiRoutes.course.getAvailableCourses, {
        searchTerm,
        filterCategoryId,
        isFeatured,
        isRecommended,
        orderBy
    });

    return {
        courses: qr.data,
        coursesError: qr.error,
        coursesState: qr.state
    };
};

const useAvailableCourseCategories = () => {

    const qr = QueryService.useXQueryArray<CourseCategoryDTO>(apiRoutes.course.getAvailableCourseCategories);

    return {
        courseCategories: qr.data,
        courseCategoriesError: qr.error,
        courseCategoriesState: qr.state
    };
};

const useGreetingData = (courseId: Id<'Course'>) => {

    const qr = QueryService
        .useXQuery<{
            isPrequizRequired: boolean,
            isPretestRequired: boolean,
            firstItemPlaylistCode: string
        }>(apiRoutes.course.getGreetingsData, { courseId });

    return {
        greetingsData: qr.data,
        greetingsDataError: qr.error,
        greetingsDataState: qr.state
    };
};

export const CourseApiService = {
    useStartCourse,
    usePermissionAssignCourses,
    useAdminCourseList,
    useSetCourseMode,
    useCourseDetailsEditData,
    useCourseContentAdminData,
    useCreateCourse,
    useDeleteCourse,
    useSaveCourseDetailsData,
    useSaveCourseContentData,
    useUploadCourseThumbnailAsync,
    useCourseBriefData,
    useCourseDetails,
    useUserCourses,
    useAvailableCourseCategories,
    useGreetingData
};