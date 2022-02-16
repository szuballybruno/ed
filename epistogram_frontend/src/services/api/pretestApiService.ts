import { IdResultDTO } from "../../models/shared_models/IdResultDTO";
import { PretestDataDTO } from "../../models/shared_models/PretestDataDTO";
import { PretestResultDTO } from "../../models/shared_models/PretestResultDTO";
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

export const usePretestResults = (courseId: number) => {

    const qr = useReactQuery2<PretestResultDTO>(apiRoutes.pretest.getPretestResults, { courseId });

    return {
        pretestResults: qr.data,
        pretestResultsError: qr.error,
        pretestResultsState: qr.state
    }
}

export const usePretestExamId = (courseId: number) => {

    const qr = useReactQuery2<IdResultDTO>(apiRoutes.pretest.getPretestExamId, { courseId });

    return {
        pretestExamId: qr.data?.id ?? null,
        pretestExamIdError: qr.error,
        pretestExamIdState: qr.state
    }
}