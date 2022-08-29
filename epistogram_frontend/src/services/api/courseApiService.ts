import { CourseAdminListItemDTO } from '../../shared/dtos/admin/CourseAdminListItemDTO';
import { CourseContentAdminDTO } from '../../shared/dtos/admin/CourseContentAdminDTO';
import { CourseContentItemAdminDTO } from '../../shared/dtos/admin/CourseContentItemAdminDTO';
import { AvailableCourseDTO } from '../../shared/dtos/AvailableCourseDTO';
import { CourseBriefData } from '../../shared/dtos/CourseBriefData';
import { CourseDetailsDTO } from '../../shared/dtos/CourseDetailsDTO';
import { CourseDetailsEditDataDTO } from '../../shared/dtos/CourseDetailsEditDataDTO';
import { CoursePermissionAssignDTO } from '../../shared/dtos/CoursePermissionAssignDTO';
import { CreateCourseDTO } from '../../shared/dtos/CreateCourseDTO';
import { IdResultDTO } from '../../shared/dtos/IdResultDTO';
import { ModuleEditDTO } from '../../shared/dtos/ModuleEditDTO';
import { Mutation } from '../../shared/dtos/mutations/Mutation';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { CourseModeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';
import { QueryService } from '../../static/QueryService';
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

const useSetRequiredCompletionDate = () => {

    const qr = usePostDataUnsafe<{ courseId: Id<'Course'>, requiredCourseCompletionDate: string }, void>(apiRoutes.course.setRequiredCompletionDate);

    return {
        setRequiredCourseCompletionDateAsync: qr.postDataAsync,
        setRequiredCourseCompletionDateState: qr.state
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

    const qr = usePostDataUnsafe<{
        courseId: Id<'Course'>,
        itemMutations: Mutation<CourseContentItemAdminDTO, 'versionCode'>[],
        moduleMutations: Mutation<ModuleEditDTO, 'versionId'>[]
    }, void>(apiRoutes.course.saveCourseContent);

    return {
        saveCourseDataAsync: qr.postDataAsync,
        saveCourseDataState: qr.state,
    };
};

const useUploadCourseThumbnailAsync = () => {

    const qr = usePostMultipartDataUnsafe<{ courseId: Id<'Course'> }>(apiRoutes.course.saveCourseThumbnail);

    return {
        saveCourseThumbnailAsync: (courseId: Id<'Course'>, file: File) => qr.postMultipartDataAsync({ courseId }, file),
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

export const CourseApiService = {
    usePermissionAssignCourses,
    useAdminCourseList,
    useSetCourseMode,
    useSetRequiredCompletionDate,
    useCourseDetailsEditData,
    useCourseContentAdminData,
    useCreateCourse,
    useDeleteCourse,
    useSaveCourseDetailsData,
    useSaveCourseContentData,
    useUploadCourseThumbnailAsync,
    useCourseBriefData,
    useCourseDetails,
    useUserCourses
};