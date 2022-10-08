import { CourseOverviewDataDTO } from '../../shared/dtos/CourseOverviewDataDTO';
import { OverviewPageDTO } from '../../shared/dtos/OverviewPageDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { GlobalEventManagerType } from '../../static/EventBus';
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

        const qr = QueryService.useXQuery<string>(apiRoutes.misc.getCurrentCourseItemCode);

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