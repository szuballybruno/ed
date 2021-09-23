import { hasValue, useReactQuery } from "../frontendHelpers"
import { CourseShortDTO } from "../models/shared_models/CourseShortDTO";
import { GetUserCoursesDTO } from "../models/shared_models/GetUserCoursesDTO";
import { httpPostAsync } from "./httpClient";
import { CourseAdminDTO } from "../models/shared_models/CourseAdminDTO";
import { AdminPageEditCourseDTO } from "../models/shared_models/AdminPageEditCourseDTO";

export const useAdministratedCourses = (searchText: string) => {

    const { data, status, error } = useReactQuery<CourseAdminDTO[]>(
        ["getCoursesQuery", searchText],
        () => httpPostAsync(hasValue(searchText) ? "/get-admin-courses?searchData=" + searchText : "/get-admin-courses"));

    return {
        courses: data ?? [],
        error,
        status
    }
}

export const useAdminEditedCourse = (courseId: number) => {

    const { data, status, error } = useReactQuery<AdminPageEditCourseDTO>(
        ["getCourseEditQuery", courseId],
        () => httpPostAsync("/get-admin-edit-course", {
            courseId: courseId
        }))

    return {
        course: data,
        error,
        status
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

    const { data, status, error } = useReactQuery<CourseShortDTO[]>(
        ["getCoursesQuery", dto.isFeatured, dto.isRecommended, dto.searchCategory, dto.searchText],
        () => httpPostAsync("/get-user-courses", dto));

    return {
        courses: (data ?? []),
        error,
        status
    }
}