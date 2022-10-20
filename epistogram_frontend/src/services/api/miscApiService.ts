import { CourseOverviewDataDTO } from '../../shared/dtos/CourseOverviewDataDTO';
import { OverviewPageDTO } from '../../shared/dtos/OverviewPageDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { GlobalEventManagerType } from '../../static/EventBus';
import { useGetCurrentAppRoute } from '../../static/frontendHelpers';
import { QueryService } from '../../static/QueryService';

export const useCourseOverviewData = () => {

    const qr = QueryService.useXQuery<CourseOverviewDataDTO>(apiRoutes.misc.getCourseOverviewData);

    return {
        courseOverviewData: qr.data
    };
};

export const useOverviewPageDTO = () => {

    const queryRes = QueryService.useXQuery<OverviewPageDTO>(apiRoutes.misc.getHomePageDTO);

    return {
        pageDTO: queryRes.data,
        status: queryRes.state,
        error: queryRes.error
    };
};

export const useMiscApiService = (globalEventManager: GlobalEventManagerType) => {

    const useCurrentCourseItemCode = () => {

        const currentRoute = useGetCurrentAppRoute();
        const isEnabled = !currentRoute.isUnauthorized;
        const qr = QueryService.useXQuery<string>(apiRoutes.misc.getCurrentCourseItemCode, undefined, isEnabled);

        return {
            refetchCurrentCourseItemCode: qr.refetch,
            currentCourseItemCode: qr.data
        };
    };

    return {
        useCurrentCourseItemCode
    };
};

export type MiscApiService = ReturnType<typeof useMiscApiService>;