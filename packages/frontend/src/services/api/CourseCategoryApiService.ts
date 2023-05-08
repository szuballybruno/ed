import { CompanyCourseCategoriesDTO, CourseCategoryDTO, CreateCourseCategoryDTO, apiRoutes } from '@episto/communication';
import { QueryService } from '../../static/XQuery/XQueryReact';
import { usePostDataUnsafe } from '../core/httpClient';
import { Id } from '@episto/commontypes';

const useCreateCourseCategory = () => {

    const qr = usePostDataUnsafe<CreateCourseCategoryDTO, void>(apiRoutes.courseCategory.createCourseCategory);

    return {
        createCourseCategoryAsync: qr.postDataAsync,
        createCourseCategoryState: qr.state,
    };
};

const useDeleteCourseCategory = () => {

    const qr = usePostDataUnsafe<{ courseCategoryId: Id<'CourseCategory'>, companyId: Id<'Company'> }, void>(apiRoutes.courseCategory.deleteCourseCategory);

    return {
        deleteCourseCategoryAsync: qr.postDataAsync,
        deleteCourseCategoryState: qr.state
    };
};

const useAvailableCourseCategories = () => {

    const qr = QueryService.useXQueryArray<CourseCategoryDTO>(apiRoutes.courseCategory.getAvailableCourseCategories);

    return {
        courseCategories: qr.data,
        courseCategoriesError: qr.error,
        courseCategoriesState: qr.state
    };
};

const useSaveCompanyCourseCategories = () => {

    const qr = usePostDataUnsafe(apiRoutes.courseCategory.saveCompanyCourseCategories);

    return {
        saveCompanyCourseCategoriesAsync: qr.postDataAsync,
        saveCompanyCourseCategoriesState: qr.state
    };
};

const useGetCompanyCourseCategories = (companyId) => {

    const qr = QueryService.useXQuery<CompanyCourseCategoriesDTO[]>(apiRoutes.courseCategory.getCompanyCourseCategories, { companyId });

    return {
        companyCourseCategories: qr.data || [],
        companyCourseCategoriesError: qr.error,
        companyCourseCategoriesState: qr.state,
        refetchCompanyCourseCategoriesResults: qr.refetch
    };
};
export const CourseCategoryApiService = {
    useCreateCourseCategory,
    useDeleteCourseCategory,
    useSaveCompanyCourseCategories,
    useGetCompanyCourseCategories,
    useAvailableCourseCategories,
};