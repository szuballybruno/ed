import { ModuleEditDTO } from '../../shared/dtos/ModuleEditDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { useXQueryArray } from '../../static/frontendHelpers';
import { usePostMultipartDataUnsafe } from '../core/httpClient';

export const ModuleApiService = {

    useModuleListEditData: (courseId: Id<'Course'>, isEnabled: boolean) => {

        const qr = useXQueryArray<ModuleEditDTO>(apiRoutes.module.getModuleListEditData, { courseId }, isEnabled);

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