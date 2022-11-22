import { Id } from '@episto/commontypes';
import { ActivationCodeListDTO, apiRoutes, CourseOverviewDataDTO, CurrentCourseDataDTO, OverviewPageDTO, QuestionModuleCompareDTO } from '@episto/communication';
import { useAuthStateContext } from '../../components/system/AuthenticationFrame';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { GlobalEventManagerType } from '../../components/system/EventManagerFrame';
import { useGetCurrentAppRoute } from '../../static/frontendHelpers';
import { QueryService } from '../../static/XQuery/XQueryReact';
import { usePostDataUnsafe } from '../core/httpClient';

export const useCourseOverviewData = (userId?: Id<'User'>, courseId?: Id<'Course'>) => {

    const qr = QueryService.useXQuery<CourseOverviewDataDTO>(apiRoutes.misc.getCourseOverviewData, { userId, courseId });

    return {
        courseOverviewData: qr.data
    };
};

export const useCourseOverviewModuleCompareData = (userId?: Id<'User'>, courseId?: Id<'Course'>) => {

    const qr = QueryService.useXQuery<QuestionModuleCompareDTO[]>(apiRoutes.misc.getCourseOverviewModuleCompareData, { userId, courseId });

    return {
        courseOverviewModuleCompareData: qr.data
    };
};

export const useOverviewPageDTO = () => {

    const queryRes = QueryService
        .useXQueryNew<OverviewPageDTO>(apiRoutes.misc.getHomePageDTO, {
            refetchOnMount: true
        });

    return {
        pageDTO: queryRes.data,
        status: queryRes.state,
        error: queryRes.error
    };
};

export const useMiscApiService = (globalEventManager: GlobalEventManagerType) => {

    const useCurrentCourseItemCode = () => {

        const currentRoute = useGetCurrentAppRoute();
        const state = useAuthStateContext();
        const isEnabled = !currentRoute.isUnauthorized && state === 'authenticated';

        const qr = QueryService
            .useXQueryNew<CurrentCourseDataDTO>(apiRoutes.misc.getCurrentCourseData, { isEnabled });

        return {
            refetchCurrentCourseItemCode: qr.refetch,
            currentCourseData: qr.data
        };
    };

    const useActivationCodesList = (companyId: Id<'Company'> | null) => {

        const regViaActivationCodeRoute = applicationRoutes
            .registerViaActivationCodeRoute;

        type QueryType = typeof regViaActivationCodeRoute.queryType;

        const getUrlTemplate = () => {

            const tokens = {
                code: '%CODE%',
                domain: '%DOMAIN%'
            };

            const query: QueryType = {
                activationCode: tokens.code
            };

            const queryKey = Object
                .keys(query)
                .single();

            const path = regViaActivationCodeRoute
                .route
                .getAbsolutePath();

            const urlTemplate = `${tokens.domain}${path}?${queryKey}=${query[queryKey]}`;

            return urlTemplate;
        };

        const urlTemplate = getUrlTemplate();

        const qr = QueryService
            .useXQueryArrayParametrized(ActivationCodeListDTO, apiRoutes.misc.getActivationCodeList, { companyId: companyId!, urlTemplate }, !!companyId);

        return {
            activationCodeLinks: qr.data,
            activationCodeLinksState: qr.state,
            activationCodeLinksError: qr.error,
            refetchActivationCodeLinks: qr.refetch
        };
    };

    const useGenerateActivationCodesPreview = () => {

        const qr = usePostDataUnsafe(apiRoutes.misc.generateActivationCodesPreview);

        return {
            generateActivationCodesPreviewAsync: qr.postDataAsync,
            activationCodesPreviewList: qr.result ?? [] as any as string[]
        };
    };

    const useGenerateActivationCodes = () => {

        const qr = usePostDataUnsafe(apiRoutes.misc.generateActivationCodes);

        return {
            generateActivationCodesAsync: qr.postDataAsync,
        };
    };

    return {
        useCurrentCourseItemCode,
        useActivationCodesList,
        useGenerateActivationCodesPreview,
        useGenerateActivationCodes
    };
};

export type MiscApiService = ReturnType<typeof useMiscApiService>;