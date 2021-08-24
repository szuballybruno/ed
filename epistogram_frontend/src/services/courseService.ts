import { hasValue, useReactQuery } from "../frontendHelpers"
import { GetUserCoursesDTO } from "../models/shared_models/GetUserCoursesDTO";
import { httpGetAsync, httpPostAsync } from "./httpClient";

export const useAdministratedCourses = (searchText: string) => {

    const { data, status, error } = useReactQuery(
        ["getCoursesQuery", searchText],
        () => httpGetAsync(hasValue(searchText) ? "/courses?searchData=" + searchText : "/courses"));

    return {
        courses: data,
        error,
        status
    }
}

export const useUserCourses = (dto: GetUserCoursesDTO) => {

    const { data, status, error } = useReactQuery(
        ["getCoursesQuery", dto.isFeatured, dto.isRecommended, dto.searchCategory, dto.searchText],
        () => httpPostAsync("/get-user-courses", dto));

    return {
        courses: (data ?? []),
        error,
        status
    }
}