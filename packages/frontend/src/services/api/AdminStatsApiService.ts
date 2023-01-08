import { AdminCourseCarouselDataDTO, apiRoutes } from "@episto/communication";
import { Id } from "@thinkhub/x-core";
import { QueryService } from "../../static/XQuery/XQueryReact";

const useAdminCourseStatCarouselDatas = (companyId: Id<'Company'> | null) => {

    const queryRes = QueryService
        .useXQueryArrayParametrized(AdminCourseCarouselDataDTO, apiRoutes.adminstats.getCourseStatsCarouselData, { companyId: companyId! }, !!companyId);

    return {
        adminOverviewStatsDatas: queryRes.data,
    };
};


export const AdminStatsApiService = {
    useAdminCourseStatCarouselDatas
}