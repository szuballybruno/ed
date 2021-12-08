import { useReactQuery2 } from "../../frontendHelpers";
import { ModuleAdminEditDTO } from "../../models/shared_models/ModuleAdminEditDTO";
import { ModuleCreateDTO } from "../../models/shared_models/ModuleCreateDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { usePostDataUnsafe } from "../core/httpClient";

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

    const qr = usePostDataUnsafe<ModuleAdminEditDTO, void>(apiRoutes.module.saveModule);

    return {
        saveModuleAsync: qr.postDataAsync
    };
}

export const useModuleEditData = (moduleId: number) => {

    const qr = useReactQuery2<ModuleAdminEditDTO>(apiRoutes.module.getModuleEditData, { moduleId });

    return {
        moduleEditData: qr.data,
        moduleEditDataError: qr.error,
        moduleEditDataState: qr.state,
        refetchModuleEditDataAsync: qr.refetch
    }
}