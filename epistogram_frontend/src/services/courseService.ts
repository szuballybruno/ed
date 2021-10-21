import { hasValue, useReactQuery } from "../frontendHelpers"
import { CourseShortDTO } from "../models/shared_models/CourseShortDTO";
import { GetUserCoursesDTO } from "../models/shared_models/GetUserCoursesDTO";
import { httpGetAsync, httpPostAsync } from "./httpClient";
import { CourseAdminDTO } from "../models/shared_models/CourseAdminDTO";
import { AdminPageEditCourseDTO } from "../models/shared_models/AdminPageEditCourseDTO";
import { UserCoursesDataDTO } from "../models/shared_models/UserCoursesDataDTO";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { CourseBriefData } from "../models/shared_models/CourseBriefData";

export const useAdministratedCourses = (searchText: string) => {

    const { data, status, error } = useReactQuery<CourseAdminDTO[]>(
        ["getCoursesQuery", searchText],
        () => httpPostAsync(hasValue(searchText) ? "/get-admin-courses?searchData=" + searchText : "/get-admin-courses"));

    return {
        courses: data ?? [],
        coursesError: error,
        coursesStatus: status
    }
}

export const useAdminEditedCourse = (courseId: number) => {

    const qr = useReactQuery<AdminPageEditCourseDTO>(
        ["getCourseEditQuery", courseId],
        () => httpGetAsync(apiRoutes.course.getCourseEditData, { courseId: courseId }))

    return {
        courseEditData: qr.data,
        courseEditDataError: qr.error,
        courseEditDataState: qr.status
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

export const useUserCourses = (dto: GetUserCoursesDTO) => {

    const { data, status, error } = useReactQuery<CourseShortDTO[]>(
        ["getCoursesQuery", dto.isFeatured, dto.isRecommended, dto.searchCategory, dto.searchText],
        () => httpPostAsync("/get-user-courses", dto));

    return {
        courses: (data ?? []),
        error,
        status
    }
}

export const useUserCourseData = () => {

    const { data, status, error } = useReactQuery<UserCoursesDataDTO>(
        ["getUserCoursesDataDTO"],
        () => httpGetAsync("/users/get-courses-data"));

    return {
        coursesData: data,
        coursesDataError: error,
        coursesDataStatus: status
    }
}
