import { ModuleAdminEditDTO } from '../../shared/dtos/ModuleAdminEditDTO';
import { ModuleCreateDTO } from '../../shared/dtos/ModuleCreateDTO';
import { ModuleListEditDataDTO } from '../../shared/dtos/ModuleListEditDataDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { usePostDataUnsafe, usePostMultipartDataUnsafe } from '../core/httpClient';

export const useCreateModule = () => {

    const qr = usePostDataUnsafe<ModuleCreateDTO, void>(apiRoutes.module.createModule);

    return {
        createModuleAsync: qr.postDataAsync,
    };
};

export const useDeleteModule = () => {

    const qr = usePostDataUnsafe<{ moduleId: number }, void>(apiRoutes.module.deleteModule);

    return {
        deleteModuleAsync: (moduleId: number) => qr.postDataAsync({ moduleId }),
        deleteModuleState: qr.state,
    };
};

export const useSaveModule = () => {

    const qr = usePostMultipartDataUnsafe<ModuleAdminEditDTO>(apiRoutes.module.saveModule);

    return {
        saveModuleAsync: qr.postMultipartDataAsync
    };
};

export const useModuleEditData = (moduleId: number) => {

    const qr = useReactQuery2<ModuleAdminEditDTO>(apiRoutes.module.getModuleEditData, { moduleId });

    return {
        moduleEditData: qr.data,
        moduleEditDataError: qr.error,
        moduleEditDataState: qr.state,
        refetchModuleEditDataAsync: qr.refetch
    };
};

export const useModuleListEditData = (courseId: number, isEnabled: boolean) => {

    const qr = useReactQuery2<ModuleListEditDataDTO>(apiRoutes.module.getModuleListEditData, { courseId }, isEnabled);

    return {
        moduleListEditData: qr.data,
        moduleListEditDataError: qr.error,
        moduleListEditDataState: qr.state,
        refetchModuleListEditData: qr.refetch
    };
};