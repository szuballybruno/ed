import { useReactQuery2 } from "../../static/frontendHelpers";
import { DailyTipDTO } from "../../models/shared_models/DailyTipDTO";
import { JobTitleDTO } from "../../models/shared_models/JobTitleDTO";
import { OrganizationDTO } from "../../models/shared_models/OrganizationDTO";
import { OverviewPageDTO } from "../../models/shared_models/OverviewPageDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";

export const useCurrentCourseItemCode = () => {

    const qr = useReactQuery2<string>(apiRoutes.misc.getCurrentCourseItemCode);

    return {
        currentCourseItemCode: qr.data
    };
}

export const useCourseOverviewData = () => {

    const qr = useReactQuery2<string>(apiRoutes.misc.getCourseOverviewData);

    return {
        courseOverviewData: qr.data
    };
}

export const useJobTitles = () => {

    const queryRes = useReactQuery2<JobTitleDTO[]>(apiRoutes.misc.getJobTitles);

    return {
        jobTitles: queryRes.data ?? [],
        jobTitlesStatus: queryRes.state,
        jobTitlesError: queryRes.error
    }
}

export const useOverviewPageDTO = () => {

    const queryRes = useReactQuery2<OverviewPageDTO>(apiRoutes.misc.getHomePageDTO);

    return {
        pageDTO: queryRes.data,
        status: queryRes.state,
        error: queryRes.error
    }
}

export const useDailyTip = () => {

    const qr = useReactQuery2<DailyTipDTO>(apiRoutes.misc.getDailyTip);

    return {
        dailyTipData: qr.data,
        dailyTipError: qr.error,
        dailyTipState: qr.state
    }
}

export const useOrganizations = () => {

    const qr = useReactQuery2<OrganizationDTO[]>(apiRoutes.misc.getOrganizations);

    return {
        organizations: qr.data ?? [],
        organizationsState: qr.state
    }
}