import { CourseAdminListItemDTO } from '../../shared/dtos/admin/CourseAdminListItemDTO';
import { CourseContentAdminDTO } from '../../shared/dtos/admin/CourseContentAdminDTO';
import { CourseContentItemAdminDTO } from '../../shared/dtos/admin/CourseContentItemAdminDTO';
import { CourseBriefData } from '../../shared/dtos/CourseBriefData';
import { CourseDetailsDTO } from '../../shared/dtos/CourseDetailsDTO';
import { CourseDetailsEditDataDTO } from '../../shared/dtos/CourseDetailsEditDataDTO';
import { CoursePermissionAssignDTO } from '../../shared/dtos/CoursePermissionAssignDTO';
import { CourseShortDTO } from '../../shared/dtos/CourseShortDTO';
import { CreateCourseDTO } from '../../shared/dtos/CreateCourseDTO';
import { IdResultDTO } from '../../shared/dtos/IdResultDTO';
import { ModuleEditDTO } from '../../shared/dtos/ModuleEditDTO';
import { Mutation } from '../../shared/dtos/mutations/Mutation';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { CourseModeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { usePostDataUnsafe, usePostMultipartDataUnsafe } from '../core/httpClient';

export const CourseApiService = {

    usePermissionAssignCourses: (userId: Id<'User'>) => {

        const qr = useReactQuery2<CoursePermissionAssignDTO[]>(apiRoutes.course.getPermissionAssignCourses, { userId });

        return {
            permissionAssignCourses: qr.data ?? [],
        };
    },

    useAdminCourseList: (searchText: string) => {

        const qr = useReactQuery2<CourseAdminListItemDTO[]>(apiRoutes.course.getAdminCourseList, { searchText });

        return {
            courses: qr.data ?? [],
            coursesError: qr.error,
            coursesStatus: qr.state,
            refetchCoursesAsync: qr.refetch
        };
    },

    useSetCourseMode: () => {

        const qr = usePostDataUnsafe<{ courseId: Id<'Course'>, mode: CourseModeType }, void>(apiRoutes.course.setCourseMode);

        return {
            setCourseModeAsync: qr.postDataAsync,
            setCourseModeState: qr.state
        };
    },

    useSetRequiredCompletionDate: () => {

        const qr = usePostDataUnsafe<{ courseId: Id<'Course'>, requiredCourseCompletionDate: string }, void>(apiRoutes.course.setRequiredCompletionDate);

        return {
            setRequiredCourseCompletionDateAsync: qr.postDataAsync,
            setRequiredCourseCompletionDateState: qr.state
        };
    },

    useCourseDetailsEditData: (courseId: Id<'Course'>) => {

        const qr = useReactQuery2<CourseDetailsEditDataDTO>(apiRoutes.course.getCourseDetailsEditData, { courseId });

        return {
            courseDetailsEditData: qr.data,
            courseDetailsEditDataError: qr.error,
            courseDetailsEditDataState: qr.state,
            refetchCourseDetailsEditData: qr.refetch
        };
    },

    useCourseContentAdminData: (courseId: Id<'Course'>, isEnabled: boolean, loadDeleted: boolean) => {

        const qr = useReactQuery2<CourseContentAdminDTO>(apiRoutes.course.getCourseContentEditData, { courseId, loadDeleted }, isEnabled);

        return {
            courseContentAdminData: qr.data,
            courseContentAdminDataError: qr.error,
            courseContentAdminDataState: qr.state,
            refetchCourseContentAdminData: qr.refetch
        };
    },

    useCreateCourse: () => {

        const qr = usePostDataUnsafe<CreateCourseDTO, void>(apiRoutes.course.createCourse);

        return {
            createCourseAsync: qr.postDataAsync,
            createCourseState: qr.state,
        };
    },

    useDeleteCourse: () => {

        const qr = usePostDataUnsafe<IdResultDTO, void>(apiRoutes.course.deleteCourse);

        return {
            deleteCourseAsync: qr.postDataAsync,
            deleteCourseState: qr.state,
        };
    },

    useSaveCourseDetailsData: () => {

        const qr = usePostDataUnsafe<CourseDetailsEditDataDTO, void>(apiRoutes.course.saveCourseDetails);

        return {
            saveCourseDataAsync: qr.postDataAsync,
            saveCourseDataState: qr.state,
        };
    },

    useSaveCourseContentData: () => {

        const qr = usePostDataUnsafe<{
            courseId: Id<'Course'>,
            itemMutations: Mutation<CourseContentItemAdminDTO, 'versionCode'>[],
            moduleMutations: Mutation<ModuleEditDTO, 'versionId'>[]
        }, void>(apiRoutes.course.saveCourseContent);

        return {
            saveCourseDataAsync: qr.postDataAsync,
            saveCourseDataState: qr.state,
        };
    },

    useUploadCourseThumbnailAsync: () => {

        const qr = usePostMultipartDataUnsafe<{ courseId: Id<'Course'> }>(apiRoutes.course.saveCourseThumbnail);

        return {
            saveCourseThumbnailAsync: (courseId: Id<'Course'>, file: File) => qr.postMultipartDataAsync({ courseId }, file),
            saveCourseThumbnailState: qr.state,
        };
    },

    useCourseBriefData: (courseId: Id<'Course'> | null) => {

        const qr = useReactQuery2<CourseBriefData>(apiRoutes.course.getCourseBriefData, { courseId }, !!courseId);

        return {
            courseBriefData: qr.data,
            courseBriefDataError: qr.error,
            courseBriefDataState: qr.state
        };
    },

    useCourseDetails: (courseId: Id<'Course'>) => {

        const qr = useReactQuery2<CourseDetailsDTO>(apiRoutes.course.getCourseDetails, { courseId });

        return {
            courseDetails: qr.data
        };
    },

    useUserCourses: (
        searchTerm: string | null,
        filterCategoryId: Id<'CourseCategory'> | null,
        isFeatured: boolean,
        isRecommended: boolean,
        orderBy: string | null
    ) => {

        const qr = useReactQuery2<CourseShortDTO[]>(apiRoutes.course.getAvailableCourses, {
            searchTerm,
            filterCategoryId,
            isFeatured,
            isRecommended,
            orderBy
        });

        return {
            courses: qr.data ?? [],
            coursesError: qr.error,
            coursesState: qr.state
        };
    }
};