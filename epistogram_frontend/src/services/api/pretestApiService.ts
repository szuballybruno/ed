import { PretestDataDTO } from "../../models/shared_models/PretestDataDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes"
import { useReactQuery2 } from "../../static/frontendHelpers"

export const usePretestData = (courseId: number) => {

    const qr = useReactQuery2<PretestDataDTO>(apiRoutes.pretest.getPretestData, { courseId });

    return {
        pretestData: qr.data,
        pretestDataError: qr.error,
        pretestDataState: qr.state
    }
}