import { UserCourseProgressChartDTO } from "../../shared/dtos/UserCourseProgressChartDTO";
import { apiRoutes } from "../../shared/types/apiRoutes";
import { useReactQuery2 } from "../../static/frontendHelpers";

export const useUserProgressData = () => {

    const qr = useReactQuery2<UserCourseProgressChartDTO>(apiRoutes.userProgress.getUserProgressData);

    return {
        userProgressData: qr.data,
        userProgressDataState: qr.state,
        userProgressDataError: qr.error
    }
}