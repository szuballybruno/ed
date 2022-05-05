import { CompanyDTO } from '../../shared/dtos/company/CompanyDTO';
import { CourseOverviewDataDTO } from '../../shared/dtos/CourseOverviewDataDTO';
import { JobTitleDTO } from '../../shared/dtos/JobTitleDTO';
import { OverviewPageDTO } from '../../shared/dtos/OverviewPageDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';

export const useCurrentCourseItemCode = () => {

    const qr = useReactQuery2<string>(apiRoutes.misc.getCurrentCourseItemCode);

    return {
        currentCourseItemCode: qr.data
    };
};

export const useCourseOverviewData = () => {

    const qr = useReactQuery2<CourseOverviewDataDTO>(apiRoutes.misc.getCourseOverviewData);

    return {
        courseOverviewData: qr.data
    };
};

export const useJobTitles = () => {

    const queryRes = useReactQuery2<JobTitleDTO[]>(apiRoutes.misc.getJobTitles);

    return {
        jobTitles: queryRes.data ?? [],
        jobTitlesStatus: queryRes.state,
        jobTitlesError: queryRes.error
    };
};

export const useOverviewPageDTO = () => {

    const queryRes = useReactQuery2<OverviewPageDTO>(apiRoutes.misc.getHomePageDTO);

    return {
        pageDTO: queryRes.data,
        status: queryRes.state,
        error: queryRes.error
    };
};