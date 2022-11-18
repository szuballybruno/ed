import { ModuleEditDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { QueryService } from '../../static/XQuery/XQueryReact';
import { usePostMultipartDataUnsafe } from '../core/httpClient';

export const ModuleApiService = {

    useModuleListEditData: (courseId: Id<'Course'>, isEnabled: boolean) => {

        const qr = QueryService.useXQueryArray<ModuleEditDTO>(apiRoutes.module.getModuleListEditData, { courseId }, isEnabled);

        return {
            moduleListEditData: qr.data,
            moduleListEditDataError: qr.error,
            moduleListEditDataState: qr.state,
            refetchModuleListEditData: qr.refetch
        };
    },

    useSaveCoverFile: () => {

        const qr = usePostMultipartDataUnsafe(apiRoutes.module.saveCoverFile);

        return {
            saveCoverFile: qr.postMultipartDataAsync
        };
    }
};