import { hasValue, useReactQuery } from "../frontendHelpers"
import { CourseShortDTO } from "../models/shared_models/CourseShortDTO";
import { GetUserCoursesDTO } from "../models/shared_models/GetUserCoursesDTO";
import { httpGetAsync, httpPostAsync } from "./httpClient";
import {CourseAdminDTO} from "../models/shared_models/CourseAdminDTO";

export const useAdministratedCourses = (searchText: string) => {

    const { data, status, error } = useReactQuery<CourseAdminDTO[]>(
        ["getCoursesQuery", searchText],
        () => httpPostAsync(hasValue(searchText) ? "/get-admin-courses?searchData=" + searchText : "/get-admin-courses"));

    return {
        courses: data,
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