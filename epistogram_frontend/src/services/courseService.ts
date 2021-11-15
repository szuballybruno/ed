import { hasValue, useReactQuery } from "../frontendHelpers"
import { CourseShortDTO } from "../models/shared_models/CourseShortDTO";
import { httpGetAsync, httpPostAsync, usePostDataUnsafe } from "./httpClient";
import { UserCoursesDataDTO } from "../models/shared_models/UserCoursesDataDTO";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { CourseBriefData } from "../models/shared_models/CourseBriefData";
import { TextDTO } from "../models/shared_models/TextDTO";
import { CourseAdminListItemDTO } from "../models/shared_models/CourseAdminListItemDTO";
import { CourseEditDataDTO } from "../models/shared_models/CourseEditDataDTO";
import { CreateCourseDTO } from "../models/shared_models/CreateCourseDTO";
import { IdResultDTO } from "../models/shared_models/IdResultDTO";
import { CourseDetailsDTO } from "../models/shared_models/CourseDetailsDTO";
import { ModuleCreateDTO } from "../models/shared_models/ModuleCreateDTO";

export const useAdminCourseList = (searchText: string) => {

    const qr = useReactQuery<CourseAdminListItemDTO[]>(
        ["getCoursesQuery", searchText],
        () => httpGetAsync(apiRoutes.course.getAdminCourseList));

    return {
        courses: qr.data ?? [],
        coursesError: qr.error,
        coursesStatus: qr.status,
        refetchCoursesAsync: qr.refetch
    }
}

export const useAdminEditedCourse = (courseId: number) => {

    const qr = useReactQuery<CourseEditDataDTO>(
        ["getCourseEditQuery", courseId],
        () => httpGetAsync(apiRoutes.course.getCourseEditData, { courseId: courseId }))

    return {
        courseEditData: qr.data,
        courseEditDataError: qr.error,
        courseEditDataState: qr.status
    }
}

export const useCreateCourse = () => {

    const qr = usePostDataUnsafe<CreateCourseDTO, void>(apiRoutes.course.createCourse);

    return {
        createCourseAsync: qr.postDataAsync,
        createCourseState: qr.state,
    };
}

export const useCreateModule = () => {

    const qr = usePostDataUnsafe<ModuleCreateDTO, void>(apiRoutes.course.createModule);

    return {
        createModuleAsync: qr.postDataAsync,
    };
}

export const useDeleteCourse = () => {

    const qr = usePostDataUnsafe<IdResultDTO, void>(apiRoutes.course.deleteCourse);

    return {
        deleteCourseAsync: qr.postDataAsync,
        deleteCourseState: qr.state,
    };
}

export const useSaveCourseData = () => {

    const qr = usePostDataUnsafe<CourseEditDataDTO, void>(apiRoutes.course.saveCourseData);

    return {
        saveCourseDataAsync: qr.postDataAsync,
        saveCourseDataState: qr.state,
    };
}

export const useStartCourse = () => {

    const qr = usePostDataUnsafe<IdResultDTO, TextDTO>(apiRoutes.course.startCourse);

    return {
        startCourseAsync: (courseId: number) => qr.postDataAsync({ id: courseId }),
        startCourseState: qr.state,
    }
}

export const useUploadCourseThumbnailAsync = () => {

    const qr = usePostDataUnsafe<{ courseId: number }, void>(apiRoutes.course.saveCourseThumbnail);

    return {
        saveCourseThumbnailAsync: (courseId: number, file: File) => qr.postDataAsync({ courseId }, file),
        saveCourseThumbnailState: qr.state,
    }
}

export const useCourseBriefData = (courseId: number | null) => {

    const qr = useReactQuery<CourseBriefData>(
        ["courseBriefDataQuery", courseId],
        () => httpGetAsync(apiRoutes.course.getCourseBriefData, { courseId: courseId }),
        !!courseId)

    return {
        courseBriefData: qr.data,
        courseBriefDataError: qr.error,
        courseBriefDataState: qr.status
    }
}

export const useCourseDetails = (courseId: number) => {

    const { data, status, error } = useReactQuery<CourseDetailsDTO>(
        ["useCourseDetails"],
        () => httpGetAsync(apiRoutes.course.getCourseDetails, { courseId }));

    return {
        courseDetails: data
    }
}

export const useUserCourses = () => {

    const { data, status, error } = useReactQuery<CourseShortDTO[]>(
        ["getCoursesQuery"],
        () => httpGetAsync(apiRoutes.course.getAvailableCourses));

    return {
        courses: (data ?? []),
        error,
        status
    }
}

export const useUserCourseData = () => {

    const { data, status, error } = useReactQuery<UserCoursesDataDTO>(
        ["getUserCoursesDataDTO"],
        () => httpGetAsync(apiRoutes.learning.getCourseProgressData));

    return {
        coursesData: data,
        coursesDataError: error,
        coursesDataStatus: status
    }
}
