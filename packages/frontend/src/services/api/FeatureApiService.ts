import { apiRoutes, CompanyFeatureDTO, CourseFeatureDTO, FeatureDTO } from '@episto/communication';
import { usePostDataUnsafe } from '../core/httpClient';
import { QueryService } from '../../static/XQuery/XQueryReact';

const useCheckFeature = () => {

    const qr = usePostDataUnsafe<FeatureDTO, boolean>(apiRoutes.feature.checkFeature);

    return {
        checkFeature: qr.postDataAsync,
        checkFeatureState: qr.state
    };
};

const useGetCompanyFeatures = (companyId) => {

    const qr = QueryService.useXQuery<CompanyFeatureDTO[]>(apiRoutes.feature.getCompanyFeatures, { companyId });

    return {
        companyFeatures: qr.data || [],
        companyFeaturesError: qr.error,
        companyFeaturesState: qr.state,
        refetchCompanyFeatureResults: qr.refetch
    };
};

const useSaveCompanyFeatures = () => {

    const qr = usePostDataUnsafe(apiRoutes.feature.saveCompanyFeatures);

    return {
        saveCompanyFeaturesAsync: qr.postDataAsync,
        saveCompanyFeaturesState: qr.state
    };
};

const useGetCourseFeatures = (courseId) => {

    const qr = QueryService.useXQuery<CourseFeatureDTO[]>(apiRoutes.feature.getCourseFeatures, { courseId });

    return {
        courseFeatures: qr.data || [],
        courseFeaturesError: qr.error,
        courseFeaturesState: qr.state,
        refetchCourseFeatureResults: qr.refetch
    };
};

const useSaveCourseFeatures = () => {

    const qr = usePostDataUnsafe(apiRoutes.feature.saveCourseFeatures);

    return {
        saveCourseFeaturesAsync: qr.postDataAsync,
        saveCourseFeaturesState: qr.state
    };
};

export const FeatureApiService = {
    useCheckFeature,
    useGetCompanyFeatures,
    useSaveCompanyFeatures,
    useGetCourseFeatures,
    useSaveCourseFeatures
};