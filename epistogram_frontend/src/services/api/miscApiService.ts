import { CourseOverviewDataDTO } from '../../shared/dtos/CourseOverviewDataDTO';
import { JobTitleDTO } from '../../shared/dtos/JobTitleDTO';
import { OverviewPageDTO } from '../../shared/dtos/OverviewPageDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { QueryService } from '../../static/QueryService';

export const useCurrentCourseItemCode = () => {

    const qr = QueryService.useXQuery<string>(apiRoutes.misc.getCurrentCourseItemCode);

    return {
        currentCourseItemCode: qr.data
    };
};

export const useCourseOverviewData = () => {

    const qr = QueryService.useXQuery<CourseOverviewDataDTO>(apiRoutes.misc.getCourseOverviewData);

    return {
        courseOverviewData: qr.data
    };
};

export const useJobTitles = () => {

    const queryRes = QueryService.useXQuery<JobTitleDTO[]>(apiRoutes.misc.getJobTitles);

    return {
        jobTitles: queryRes.data ?? [],
        jobTitlesStatus: queryRes.state,
        jobTitlesError: queryRes.error
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