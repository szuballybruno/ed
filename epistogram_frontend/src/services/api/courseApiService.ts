import { useReactQuery2 } from "../../static/frontendHelpers";
import { CourseAdminListItemDTO } from "../../models/shared_models/CourseAdminListItemDTO";
import { CourseBriefData } from "../../models/shared_models/CourseBriefData";
import { CourseDetailsDTO } from "../../models/shared_models/CourseDetailsDTO";
import { CourseEditDataDTO } from "../../models/shared_models/CourseEditDataDTO";
import { CourseShortDTO } from "../../models/shared_models/CourseShortDTO";
import { CreateCourseDTO } from "../../models/shared_models/CreateCourseDTO";
import { IdResultDTO } from "../../models/shared_models/IdResultDTO";
import { TextDTO } from "../../models/shared_models/TextDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { UserCoursesDataDTO } from "../../models/shared_models/UserCoursesDataDTO";
import { usePostDataUnsafe } from "../core/httpClient";
import { CourseProgressShortDTO } from "../../models/shared_models/CourseProgressShortDTO";

export const useAdminCourseList = (searchText: string) => {

    const qr = useReactQuery2<CourseAdminListItemDTO[]>(apiRoutes.course.getAdminCourseList, { searchText });

    return {
        courses: qr.data ?? [],
        coursesError: qr.error,
        coursesStatus: qr.state,
        refetchCoursesAsync: qr.refetch
    }
}

export const useAdminEditedCourse = (courseId: number) => {

    const qr = useReactQuery2<CourseEditDataDTO>(apiRoutes.course.getCourseEditData, { courseId });

    return {
        courseEditData: qr.data,
        courseEditDataError: qr.error,
        courseEditDataState: qr.state,
        refetchCourseEditDataAsync: qr.refetch
    }
}

export const useCreateCourse = () => {

    const qr = usePostDataUnsafe<CreateCourseDTO, void>(apiRoutes.course.createCourse);

    return {
        createCourseAsync: qr.postDataAsync,
        createCourseState: qr.state,
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

    const qr = useReactQuery2<CourseBriefData>(apiRoutes.course.getCourseBriefData, { courseId }, !!courseId);

    return {
        courseBriefData: qr.data,
        courseBriefDataError: qr.error,
        courseBriefDataState: qr.state
    }
}

export const useCourseDetails = (courseId: number) => {

    const qr = useReactQuery2<CourseDetailsDTO>(apiRoutes.course.getCourseDetails, { courseId });

    return {
        courseDetails: qr.data
    }
}

export const useUserCourses = () => {

    const qr = useReactQuery2<CourseShortDTO[]>(apiRoutes.course.getAvailableCourses);

    return {
        courses: qr.data ?? [],
        coursesError: qr.error,
        coursesState: qr.state
    }
}

export const useUserCourseData = () => {

    const qr = useReactQuery2<UserCoursesDataDTO>(apiRoutes.course.getCourseProgressData);

    return {
        coursesData: qr.data,
        coursesDataError: qr.error,
        coursesDataStatus: qr.state
    }
}

export const useCourseProgressShortDtos = () => {

    const qr = useReactQuery2<CourseProgressShortDTO[]>(apiRoutes.course.getCourseProgressShort);

    return {
        courseProgressShortDtos: qr.data ?? [],
        courseProgressShortError: qr.error,
        courseProgressShortState: qr.state
    }
}