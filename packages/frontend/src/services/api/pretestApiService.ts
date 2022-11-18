import { PretestDataDTO } from '@episto/communication';
import { PretestResultDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { QueryService } from '../../static/XQuery/XQueryReact';
import { usePostDataUnsafe } from '../core/httpClient';

export const PretestApiService = {

    usePretestData: (courseId: Id<'Course'>) => {

        const qr = QueryService.useXQuery<PretestDataDTO>(apiRoutes.pretest.getPretestData, { courseId });

        return {
            pretestData: qr.data,
            pretestDataError: qr.error,
            pretestDataState: qr.state
        };
    },

    usePretestResults: (courseId: Id<'Course'>) => {

        const qr = QueryService.useXQuery<PretestResultDTO>(apiRoutes.pretest.getPretestResults, { courseId });

        return {
            pretestResults: qr.data,
            pretestResultsError: qr.error,
            pretestResultsState: qr.state
        };
    },

    useFinishPretest: () => {

        const qr = usePostDataUnsafe(apiRoutes.pretest.finishPretest);

        return {
            finishPretest: qr.postDataAsync
        };
    }
};