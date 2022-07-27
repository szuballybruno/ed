import { IdResultDTO } from '../../shared/dtos/IdResultDTO';
import { PretestDataDTO } from '../../shared/dtos/PretestDataDTO';
import { PretestResultDTO } from '../../shared/dtos/PretestResultDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { usePostDataUnsafe } from '../core/httpClient';

export const PretestApiService = {

    usePretestData: (courseId: Id<'Course'>) => {

        const qr = useReactQuery2<PretestDataDTO>(apiRoutes.pretest.getPretestData, { courseId });

        return {
            pretestData: qr.data,
            pretestDataError: qr.error,
            pretestDataState: qr.state
        };
    },

    usePretestResults: (courseId: Id<'Course'>) => {

        const qr = useReactQuery2<PretestResultDTO>(apiRoutes.pretest.getPretestResults, { courseId });

        return {
            pretestResults: qr.data,
            pretestResultsError: qr.error,
            pretestResultsState: qr.state
        };
    },

    usePretestExamId: (courseId: Id<'Course'>) => {

        const qr = useReactQuery2<IdResultDTO>(apiRoutes.pretest.getPretestExamId, { courseId });

        return {
            pretestExamId: qr.data?.id ?? null,
            pretestExamIdError: qr.error,
            pretestExamIdState: qr.state
        };
    },

    useFinishPretest: () => {

        const qr = usePostDataUnsafe(apiRoutes.pretest.finishPretest);

        return {
            finishPretest: qr.postDataAsync
        };
    }
};