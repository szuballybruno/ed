import { useReactQuery } from "../frontendHelpers";
import { ModuleCreateDTO } from "../models/shared_models/ModuleCreateDTO";
import { ModuleDTO } from "../models/shared_models/ModuleDTO";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { httpGetAsync, usePostDataUnsafe } from "./httpClient";

export const useCreateModule = () => {

    const qr = usePostDataUnsafe<ModuleCreateDTO, void>(apiRoutes.module.createModule);

    return {
        createModuleAsync: qr.postDataAsync,
    };
}

export const useDeleteModule = () => {

    const qr = usePostDataUnsafe<void, void>(apiRoutes.module.deleteModule);

    return {
        deleteModuleAsync: (moduleId: number) => qr.postDataAsync(undefined, undefined, { moduleId }),
    };
}

export const useSaveModule = () => {

    const qr = usePostDataUnsafe<ModuleDTO, void>(apiRoutes.module.saveModule);

    return {
        saveModuleAsync: qr.postDataAsync
    };
}

export const useModuleEditData = (moduleId: number) => {

    const qr = useReactQuery<ModuleDTO>(
        ["getModuleEditData", moduleId],
        () => httpGetAsync(apiRoutes.module.getModuleEditData, { moduleId }))

    return {
        moduleEditData: qr.data,
        moduleEditDataError: qr.error,
        moduleEditDataState: qr.status,
        refetchModuleEditDataAsync: qr.refetch
    }
}